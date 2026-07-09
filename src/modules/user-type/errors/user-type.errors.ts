import { NotFoundError, ConflictError } from '@/shared/errors/AppError';

export class UserTypeNotFoundError extends NotFoundError {
  constructor(id: string) {
    super(`Tipo de usuário com id "${id}" não encontrado.`);
  }
}

export class UserTypeTipoConflictError extends ConflictError {
  constructor(tipo: string) {
    super(`Já existe um tipo de usuário cadastrado com o valor "${tipo}".`);
  }
}
