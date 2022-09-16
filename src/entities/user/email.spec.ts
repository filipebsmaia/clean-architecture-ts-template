import { Email } from './email';

describe('Email', () => {
  it('should be able to create valid email', () => {
    expect(Email.create('jhondoe@gmail.com').isRight()).toBe(true);
  });
  it('should not be able to create invalid email', () => {
    expect(Email.create('jhondoegmail.com').isLeft()).toBe(true);
  });
});