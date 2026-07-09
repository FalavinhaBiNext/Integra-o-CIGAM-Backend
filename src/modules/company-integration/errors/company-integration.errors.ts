import { NotFoundError, ConflictError } from '@/shared/errors/AppError';

export class CompanyIntegrationNotFoundError extends NotFoundError {
  constructor(id: string) {
    super(`Integração da empresa com id "${id}" não encontrada.`);
  }
}

export class CompanyIntegrationConflictError extends ConflictError {
  constructor(companyId: string) {
    super(`Já existe uma integração cadastrada para a empresa "${companyId}".`);
  }
}
