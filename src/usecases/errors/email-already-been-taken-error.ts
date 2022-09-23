import { UseCaseError } from '@usecases/errors/usecase-error';

export class EmailAlreadyBeenTakenError extends Error implements UseCaseError {
  constructor(email: string) {
    super(`The email "${email}" already been taken.`);
    this.name = 'EmailAlreadyBeenTakenError';
  }
}