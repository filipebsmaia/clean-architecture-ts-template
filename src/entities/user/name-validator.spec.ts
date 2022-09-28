import { Name } from './name';

describe('NameValidator', () => {

  it('should be able to accept valid name', () => {
    expect(Name.validate('Jhon Doe')).toBe(true);
  });

  it('should not be able to accept name with less than 2 characters', () => {
    expect(Name.validate('J')).toBe(false);
  });

  it('should not be able to accept name with more than 255 characters', () => {
    expect(Name.validate('J'.repeat(260))).toBe(false);
  });

});