import { PrismaUserRepository } from './PrismaUserRepository';
import { prisma } from './helpers/prisma-helper';
import { UserMapper } from '@external/mappers/UserMapper';

type PrismaDBType = typeof prisma.user;
let database: PrismaDBType;

describe('PrismaUserRepository', () => {

  beforeAll(() => {
    database = prisma.user;
  });

  beforeEach(async() => {
    await prisma.$connect();
    await database.deleteMany({});
  });

  afterEach(async() => {
    await prisma.$disconnect();
  });

  it('should be able to add user', async() => {
    const userRepo = new PrismaUserRepository();

    await userRepo.create(UserMapper.toDomain({ name: 'Jhon Doe', email: 'jhondoe@mail.com' }));

    const user = await userRepo.findUserByEmail('jhondoe@mail.com');

    expect(user).toBeDefined();
    expect(user!.email.value).toBe('jhondoe@mail.com');  // eslint-disable-line @typescript-eslint/no-non-null-assertion
  });

  it('should be able to return user if user is found', async() => {
    const userRepo = new PrismaUserRepository();
    await userRepo.create(UserMapper.toDomain({ name: 'Jhon Doe', email: 'jhondoe@mail.com' }));

    const user = await userRepo.findUserByEmail('jhondoe@mail.com');

    expect(user).toBeDefined();
    expect(user!.email.value).toBe('jhondoe@mail.com');  // eslint-disable-line @typescript-eslint/no-non-null-assertion
    expect(user!.name.value).toBe('Jhon Doe');  // eslint-disable-line @typescript-eslint/no-non-null-assertion
  });

  it('should be able to verify if user exists', async() => {
    const userRepo = new PrismaUserRepository();
    await userRepo.create(UserMapper.toDomain({ name: 'Jhon Doe', email: 'jhondoe@mail.com' }));

    const userExists = await userRepo.exists('jhondoe@mail.com');

    expect(userExists).toBe(true);
  });

  it('should be able to return null if user is not found', async() => {
    const userRepo = new PrismaUserRepository();

    const user = await userRepo.findUserByEmail('jhondoe@mail.com');

    expect(user).toEqual(null);
  });
});