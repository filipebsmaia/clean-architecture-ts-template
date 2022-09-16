import { Name } from './name';

describe('Name', () => {
  it('should be able to create valid name', () => {
    expect(Name.create('Jhon Doe').isRight()).toBe(true);
  });
  it('should not be able to create invalid name', () => {
    expect(Name.create('J').isLeft()).toBe(true);
  });
});