import { UserRepository } from '@usecases/ports/user-repository';
import { InMemoryUserRepository } from '@external/repositories/in-memory/in-memory-user-repository';
import { CreateUser } from './create-user';
import { EmailAlreadyBeenTakenError } from './errors/email-already-been-taken-error';
import { User } from '@entities/user/user';
import { UserMapper } from '@external/mappers/UserMapper';

let userRepository: UserRepository;
let createUser: CreateUser;

describe('CreateUser', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    createUser = new CreateUser(userRepository);
  });

  it('should be able to create a user', async() => {
    const rawUser = {
      email: 'jhondoe@gmail.com',
      name: 'Jhon Doe'
    };
    const user: User = UserMapper.toDomain(rawUser);

    const createdUser = await createUser.handle(rawUser);
    const repositoryUser = await userRepository.findUserByEmail(user.email.value);

    expect(createdUser.value).toMatchObject(user);
    expect(repositoryUser).toBeDefined();
    expect(createdUser.value).toMatchObject({
      email: repositoryUser?.email,
      name: repositoryUser?.name
    });
  });

  it('should not be able to create a user when email already been taken', async() => {
    const rawUser = {
      email: 'jhondoe@gmail.com',
      name: 'Jhon Doe'
    };
    const user: User = UserMapper.toDomain(rawUser);
    await userRepository.create(user);

    const createdUser = await createUser.handle(rawUser);

    expect(createdUser.isLeft()).toBe(true);
    expect(createdUser.value).toBeInstanceOf(EmailAlreadyBeenTakenError);
  });
});