import { User } from '@entities/user/user';
import { UserMapper } from '@external/mappers/UserMapper';
import { UserRepository } from '@usecases/ports/user-repository';
import { prisma } from './helpers/prisma-helper';

type PrismaDBType = typeof prisma.user;

export class PrismaUserRepository implements UserRepository {
  private database: PrismaDBType;

  constructor() {
    this.database = prisma.user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.database.findFirst({
      where: {
        email
      }
    });

    if (!user) {
      return null;
    }

    return UserMapper.toDomain(user);
  }

  async exists(email: string): Promise<boolean> {
    if (await this.findUserByEmail(email) == null) {
      return false;
    }

    return true;
  }

  async create(user: User): Promise<void> {
    const exists = await this.exists(user.email.value);
    const { name, email } = await UserMapper.toRaw(user);
    if (!exists) {
      await this.database.create({
        data: {
          name,
          email
        }
      });
    }
  }

}