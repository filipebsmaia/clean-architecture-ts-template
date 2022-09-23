import { CreateUser } from '@usecases/create-user';
import { HandlerAdapter } from './HandlerAdapter';
import { Message } from './ports/Message';

interface CreateUserBody {
  email: string;
  name: string;
}

export class CreateUserHandler implements HandlerAdapter {
  private readonly createUser: CreateUser;

  constructor(createUser: CreateUser) {
    this.createUser = createUser;
  }

  async handle(message: Message<CreateUserBody>): Promise<void> {
    const { email, name } = message;
    const createUserResponse = await this.createUser.handle({ email, name });

    if (createUserResponse.isLeft()) {
      throw createUserResponse.value;
    }

  }

}