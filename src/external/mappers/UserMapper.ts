import { Email } from '@entities/user/email';
import { Name } from '@entities/user/name';
import { User } from '@entities/user/user';
import { User as RawUser } from '@prisma/client';

export class UserMapper  {
  static toDomain(raw: RawUser): User {
    const nameOrError = Name.create(raw.name);
    const emailOrError = Email.create(raw.email);

    if (nameOrError.isLeft()) {
      throw nameOrError.value;
    }

    if (emailOrError.isLeft()) {
      throw emailOrError.value;
    }

    const userOrError = User.create({
      name: nameOrError.value,
      email: emailOrError.value
    });

    if (userOrError.isLeft()) {
      throw userOrError.value;
    }

    return userOrError.value;
  }

  static async toRaw(user: User): Promise<RawUser> {
    return {
      name: user.name.value,
      email: user.email.value
    };
  }
}