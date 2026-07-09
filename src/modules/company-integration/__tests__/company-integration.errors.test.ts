import { CompanyIntegrationNotFoundError, CompanyIntegrationConflictError } from '@/modules/company-integration/errors/company-integration.errors';

describe('CompanyIntegration Errors', () => {
  describe('CompanyIntegrationNotFoundError', () => {
    it('should create error with correct message', () => {
      const error = new CompanyIntegrationNotFoundError('123');
      expect(error.message).toBe('Integração da empresa com id "123" não encontrada.');
      expect(error.statusCode).toBe(404);
    });
  });

  describe('CompanyIntegrationConflictError', () => {
    it('should create error with correct message', () => {
      const error = new CompanyIntegrationConflictError('company-123');
      expect(error.message).toBe('Já existe uma integração cadastrada para a empresa "company-123".');
      expect(error.statusCode).toBe(409);
    });
  });
});
