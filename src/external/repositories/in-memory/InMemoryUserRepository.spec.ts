import { User } from '@entities/user/user';
import { UserMapper } from '@external/mappers/UserMapper';
import { InMemoryUserRepository } from './InMemoryUserRepository';

describe('InMemoryUserRepository', () => {

  it('should be able to add user', async() => {
    const userRepo = new InMemoryUserRepository();

    await userRepo.create(UserMapper.toDomain({ name: 'Jhon Doe', email: 'jhondoe@mail.com' }));

    const user = await userRepo.findUserByEmail('jhondoe@mail.com');

    expect(user).toBeDefined();
    expect(user!.email.value).toBe('jhondoe@mail.com');  // eslint-disable-line @typescript-eslint/no-non-null-assertion
  });
  it('should be able to return user if user is found', async() => {
    const users: User[] = [UserMapper.toDomain({ name: 'Jhon Doe', email: 'jhondoe@mail.com' })];
    const userRepo = new InMemoryUserRepository(users);

    const user = await userRepo.findUserByEmail('jhondoe@mail.com');

    expect(user).toBeDefined();
    expect(user!.email.value).toBe('jhondoe@mail.com');  // eslint-disable-line @typescript-eslint/no-non-null-assertion
    expect(user!.name.value).toBe('Jhon Doe');  // eslint-disable-line @typescript-eslint/no-non-null-assertion
  });

  it('should be able to verify if user exists', async() => {
    const users: User[] = [UserMapper.toDomain({ name: 'Jhon Doe', email: 'jhondoe@mail.com' })];
    const userRepo = new InMemoryUserRepository(users);

    const userExists = await userRepo.exists('jhondoe@mail.com');

    expect(userExists).toBe(true);
  });

  it('should be able to return null if user is not found', async() => {
    const userRepo = new InMemoryUserRepository();

    const user = await userRepo.findUserByEmail('jhondoe@mail.com');

    expect(user).toEqual(null);
  });
});