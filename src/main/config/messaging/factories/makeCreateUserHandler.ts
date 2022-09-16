import { CreateUserHandler } from '@adapters/handlers/CreateUserHandler/CreateUserHandler';
import { PrismaUserRepository } from '@external/repositories/prisma/PrismaUserRepository';
import { CreateUser } from '@usecases/create-user/create-user';

export const makeCreateUserHandler = (): CreateUserHandler => {
  const userRepository = new PrismaUserRepository();
  const createUser = new CreateUser(userRepository);
  const registerUserController = new CreateUserHandler(createUser);

  return registerUserController;
};