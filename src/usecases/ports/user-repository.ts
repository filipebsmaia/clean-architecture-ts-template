import { User } from '@entities/user/user';

export interface UserRepository {
  findUserByEmail: (email: string) => Promise<User | null>;
  exists: (email: string) => Promise<boolean>;
  create: (user: User) => Promise<void>;
}