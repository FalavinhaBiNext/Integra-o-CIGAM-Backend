import { CompanyModuloNotFoundError, CompanyModuloConflictError } from '@/modules/company-modulo/errors/company-modulo.errors';

describe('CompanyModulo Errors', () => {
  describe('CompanyModuloNotFoundError', () => {
    it('should create error with correct message', () => {
      const error = new CompanyModuloNotFoundError('123');
      expect(error.message).toBe('Associação company-modulo com id "123" não encontrada.');
      expect(error.statusCode).toBe(404);
    });
  });

  describe('CompanyModuloConflictError', () => {
    it('should create error with correct message', () => {
      const error = new CompanyModuloConflictError('company-123', 'modulo-456');
      expect(error.message).toBe('Já existe uma associação entre a empresa "company-123" e o módulo "modulo-456".');
      expect(error.statusCode).toBe(409);
    });
  });
});
