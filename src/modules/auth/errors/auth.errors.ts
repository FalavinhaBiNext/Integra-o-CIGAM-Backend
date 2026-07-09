import { UnauthorizedError } from '@/shared/errors/AppError';

export class InvalidCredentialsError extends UnauthorizedError {
  constructor() {
    super('E-mail ou senha invalidos.');
  }
}

export class TokenExpiredError extends UnauthorizedError {
  constructor() {
    super('Token expirado. Faca login novamente.');
  }
}

export class InvalidTokenError extends UnauthorizedError {
  constructor() {
    super('Token invalido.');
  }
}

export class InactiveCompanyError extends UnauthorizedError {
  constructor() {
    super('Esta empresa esta inativa na plataforma. Contate o suporte.');
  }
}
