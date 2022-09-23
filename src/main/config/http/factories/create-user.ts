import { CreateUserController } from '@adapters/controllers/create-user-controller';
import { PrismaUserRepository } from '@external/repositories/prisma/prisma-user-repository';
import { CreateUser } from '@usecases/create-user';

export const makeRegisterUserController = (): CreateUserController => {
  const userRepository = new PrismaUserRepository();
  const createUser = new CreateUser(userRepository);
  const registerUserController = new CreateUserController(createUser);

  return registerUserController;
};