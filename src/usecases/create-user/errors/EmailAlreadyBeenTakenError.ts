import { UseCaseError } from '@usecases/errors/UseCaseError';

export class EmailAlreadyBeenTakenError extends Error implements UseCaseError {
  constructor(email: string) {
    super(`The email "${email}" already been taken.`);
    this.name = 'EmailAlreadyBeenTakenError';
  }
}