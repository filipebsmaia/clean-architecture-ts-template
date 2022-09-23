import { InvalidEmailError } from '@entities/user/errors/InvalidEmailError';
import { InvalidNameError } from '@entities/user/errors/InvalidNameError';
import { InMemoryUserRepository } from '@external/repositories/in-memory/in-memory-user-repository';
import { CreateUser } from '@usecases/create-user';
import { HttpRequest } from './ports/Http';
import { CreateUserController } from './create-user-controller';

let userRepository: InMemoryUserRepository;
let createUser: CreateUser;
let createUserController: CreateUserController;
describe('Email', () => {

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    createUser = new CreateUser(userRepository);
    createUserController = new CreateUserController(createUser);
  });

  it('should be able to create user', async() => {
    const httpRequest: HttpRequest = {
      body: {
        name: 'Jhon Doe',
        email: 'jhondoe@gmail.com'
      },
      headers: {},
      params: {},
      query: {}
    };
    const httpResponse = await createUserController.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
  });

  it('should return 400 if an invalid email is provided', async() => {
    const httpRequest: HttpRequest = {
      body: {
        name: 'Jhon Doe',
        email: 'invalid_email'
      },
      headers: {},
      params: {},
      query: {}
    };
    const httpResponse = await createUserController.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body.name).toEqual(new InvalidEmailError(httpRequest.body.email).name);
  });

  it('should return 400 if an invalid name is provided', async() => {
    const httpRequest: HttpRequest = {
      body: {
        name: ' ',
        email: 'jhondoe@gmail.com'
      },
      headers: {},
      params: {},
      query: {}
    };
    const httpResponse = await createUserController.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body.name).toEqual(new InvalidNameError(httpRequest.body.email).name);
  });
});