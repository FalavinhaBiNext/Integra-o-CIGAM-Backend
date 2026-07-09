import { CompanyNotFoundError, CompanyCnpjConflictError } from '@/modules/company/errors/company.errors';

describe('Company Errors', () => {
  describe('CompanyNotFoundError', () => {
    it('should create error with correct message', () => {
      const error = new CompanyNotFoundError('123');
      expect(error.message).toBe('Empresa com id "123" não encontrada.');
      expect(error.statusCode).toBe(404);
      expect(error.name).toBe('CompanyNotFoundError');
    });
  });

  describe('CompanyCnpjConflictError', () => {
    it('should create error with correct message', () => {
      const error = new CompanyCnpjConflictError('12345678000195');
      expect(error.message).toBe('Já existe uma empresa cadastrada com o CNPJ "12345678000195".');
      expect(error.statusCode).toBe(409);
      expect(error.name).toBe('CompanyCnpjConflictError');
    });
  });
});
