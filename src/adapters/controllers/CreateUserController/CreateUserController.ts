import { CreateUser } from '@usecases/create-user/create-user';
import { ControllerAdapter } from '../ControllerAdapter';
import { badRequest, ok } from '../helpers/HttpHelper';
import { HttpRequest, HttpResponse } from '../ports/Http';

interface CreateUserBody {
  email: string;
  name: string;
}

export class CreateUserController implements ControllerAdapter {
  private readonly createUser: CreateUser;

  constructor(createUser: CreateUser) {
    this.createUser = createUser;
  }

  async handle(request: HttpRequest<CreateUserBody>): Promise<HttpResponse> {
    const { email, name } = request.body;
    const createUserResponse = await this.createUser.handle({ email, name });
    if (createUserResponse.isLeft()) {
      return badRequest(createUserResponse.value);
    }

    return ok();
  }

}