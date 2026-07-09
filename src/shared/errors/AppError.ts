export class AppError extends Error {
  public readonly statusCode: number;
  public readonly details?: unknown;
  public readonly isOperational = true;

  constructor(message: string, statusCode = 500, details?: unknown) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.details = details;
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Dados invalidos.', details?: unknown) {
    super(message, 400, details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Nao autorizado.') {
    super(message, 401);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Recurso nao encontrado.') {
    super(message, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Conflito de dados.') {
    super(message, 409);
  }
}

export class ExternalServiceError extends AppError {
  constructor(message = 'Erro em servico externo.', details?: unknown) {
    super(message, 502, details);
  }

  static fromAxios(error: unknown, serviceName: string): ExternalServiceError {
    const message = `Erro na integracao com ${serviceName}.`;
    return new ExternalServiceError(message, error);
  }
}
