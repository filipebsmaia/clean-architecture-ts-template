import { User } from '@entities/user/user';
import { UserRepository } from '@usecases/ports/UserRepository';

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  constructor(users: User[] = []) {
    this.users = users;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email.value === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async exists(email: string): Promise<boolean> {
    if (await this.findUserByEmail(email) == null) {
      return false;
    }

    return true;
  }

  async create(user: User): Promise<void> {
    const exists = await this.exists(user.email.value);

    if (!exists) {
      this.users.push(user);
    }
  }

}