import { Email } from './email';
import { Name } from './name';
import { Either, right } from '@shared/either';
import { InvalidNameError } from './errors/invalid-name-error';
import { InvalidEmailError } from './errors/invalid-email-error';

export interface UserData {
  name: Name;
  email: Email;
}

export class User {
  public readonly name: Name;
  public readonly email: Email;

  private constructor(name: Name, email: Email) {
    this.name = name;
    this.email = email;
    Object.freeze(this);
  }

  static create({ name, email }: UserData): Either<InvalidNameError | InvalidEmailError, User> {

    return right(new User(name, email));
  }
}