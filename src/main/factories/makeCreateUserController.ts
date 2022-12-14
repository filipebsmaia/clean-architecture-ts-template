import { CreateUserController } from '@adapters/controllers/CreateUserController/CreateUserController';
import { PrismaUserRepository } from '@external/repositories/prisma/PrismaUserRepository';
import { CreateUser } from '@usecases/create-user/create-user';

export const makeRegisterUserController = (): CreateUserController => {
  const userRepository = new PrismaUserRepository();
  const createUser = new CreateUser(userRepository);
  const registerUserController = new CreateUserController(createUser);
  return registerUserController;
};