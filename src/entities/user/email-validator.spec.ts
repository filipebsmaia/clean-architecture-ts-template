import { Email } from './email';

describe('EmailValidator', () => {
  it('should be able to accept valid email', () => {
    expect(Email.validate('jhondoe@gmail.com')).toBe(true);
  });

  it('should not be able to accept email without the at-sign', () => {
    expect(Email.validate('jhondoegmail.com')).toBe(false);
  });

  it('should not be able to accept more than 64 chars on local part', () => {
    const localPart = 'a'.repeat(100);
    const email = localPart + '@gmail.com';
    expect(Email.validate(email)).toBe(false);
  });

  it('should not be able to accept empty local part', () => {
    expect(Email.validate('@gmail.com')).toBe(false);
  });

  it('should not be able to accept empty email', () => {
    expect(Email.validate('')).toBe(false);
  });

  it('should not be able to accept space char', () => {
    expect(Email.validate('jhon doe@gmail.com')).toBe(false);
  });

  it('should not be able to accept a dot as first char', () => {
    expect(Email.validate('.jhondoe@gmail.com')).toBe(false);
  });

  it('should not be able to accept a dot as last char', () => {
    expect(Email.validate('jhondoe.@gmail.com')).toBe(false);
  });

  it('should not be able to accept more than 255 chars on email', () => {
    const domain = 'c'.repeat(260);
    const email = 'jhondoe@' + domain + '.com';
    expect(Email.validate(email)).toBe(false);
  });

  it('should not be able to accept more than 63 chars on domain part', () => {
    const domain = 'c'.repeat(65);
    const email = 'jhondoe@' + domain + '.com';
    expect(Email.validate(email)).toBe(false);
  });

  it('should not be able to accept dot as first domain char', () => {
    expect(Email.validate('jhondoe@.gmail.com')).toBe(false);
  });
});