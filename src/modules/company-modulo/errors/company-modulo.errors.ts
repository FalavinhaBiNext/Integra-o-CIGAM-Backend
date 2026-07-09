import { NotFoundError, ConflictError } from '@/shared/errors/AppError';

export class CompanyModuloNotFoundError extends NotFoundError {
  constructor(id: string) {
    super(`Associação company-modulo com id "${id}" não encontrada.`);
  }
}

export class CompanyModuloConflictError extends ConflictError {
  constructor(companyId: string, moduloId: string) {
    super(`Já existe uma associação entre a empresa "${companyId}" e o módulo "${moduloId}".`);
  }
}
