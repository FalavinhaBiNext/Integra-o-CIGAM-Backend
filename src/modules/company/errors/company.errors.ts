import { NotFoundError, ConflictError } from '@/shared/errors/AppError';

export class CompanyNotFoundError extends NotFoundError {
  constructor(id: string) {
    super(`Empresa com id "${id}" não encontrada.`);
  }
}

export class CompanyCnpjConflictError extends ConflictError {
  constructor(cnpj: string) {
    super(`Já existe uma empresa cadastrada com o CNPJ "${cnpj}".`);
  }
}
