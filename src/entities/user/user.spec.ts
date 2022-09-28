import { Email } from './email';
import { Name } from './name';
import { User } from './user';

describe('User', () => {

  it('should be able to create valid user', () => {
    const email = Email.create('jhondoe@gmail.com').value as Email;
    const name = Name.create('Jhon Doe').value as Name;

    expect(User.create({
      email,
      name
    }).isRight()).toBe(true);
  });
});