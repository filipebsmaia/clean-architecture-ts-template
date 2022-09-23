import { CreateUserHandler } from '@adapters/handlers/create-user-handler';
import { PrismaUserRepository } from '@external/repositories/prisma/prisma-user-repository';
import { CreateUser } from '@usecases/create-user';

export const makeCreateUserHandler = (): CreateUserHandler => {
  const userRepository = new PrismaUserRepository();
  const createUser = new CreateUser(userRepository);
  const registerUserController = new CreateUserHandler(createUser);

  return registerUserController;
};