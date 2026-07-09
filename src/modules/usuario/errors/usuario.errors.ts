import { NotFoundError, ConflictError } from '@/shared/errors/AppError';

export class UsuarioNotFoundError extends NotFoundError {
  constructor(id: string) {
    super(`Usuário com id "${id}" não encontrado.`);
  }
}

export class UsuarioEmailConflictError extends ConflictError {
  constructor(email: string) {
    super(`Já existe um usuário cadastrado com o e-mail "${email}".`);
  }
}
