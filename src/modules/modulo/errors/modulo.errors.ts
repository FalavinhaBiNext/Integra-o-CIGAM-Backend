import { NotFoundError, ConflictError } from '@/shared/errors/AppError';

export class ModuloNotFoundError extends NotFoundError {
  constructor(id: string) {
    super(`Módulo com id "${id}" não encontrado.`);
  }
}

export class ModuloNomeConflictError extends ConflictError {
  constructor(nome: string) {
    super(`Já existe um módulo cadastrado com o nome "${nome}".`);
  }
}
