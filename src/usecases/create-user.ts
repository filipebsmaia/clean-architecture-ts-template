import { Email } from '@entities/user/email';
import { InvalidEmailError } from '@entities/user/errors/InvalidEmailError';
import { InvalidNameError } from '@entities/user/errors/InvalidNameError';
import { Name } from '@entities/user/name';
import { User, UserData } from '@entities/user/user';
import { Either, left, right } from '@shared/either';
import { UserRepository } from '@usecases/ports/user-repository';
import { EmailAlreadyBeenTakenError } from './errors/email-already-been-taken-error';

type CreateUserResponse = Either<InvalidNameError | InvalidEmailError, UserData>;

export interface CreateUserRequest {
  name: string;
  email: string;
}

export class CreateUser {
  private readonly userRepository: UserRepository;

  constructor(userRepo: UserRepository) {
    this.userRepository = userRepo;
  }

  async handle({ name, email }: CreateUserRequest): Promise<CreateUserResponse> {
    const nameOrError = Name.create(name);
    const emailOrError = Email.create(email);

    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    const userOrError = User.create({
      name: nameOrError.value,
      email: emailOrError.value
    });

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const user: User = userOrError.value;
    const exists = await this.userRepository.exists(user.email.value);

    if (exists) {
      return left(new EmailAlreadyBeenTakenError(user.email.value));
    }
    await this.userRepository.create(user);

    return right(user);
  }
}