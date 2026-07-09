import { validateCreateCompany, validateUpdateCompany } from '@/modules/company/validators/company.validator';

describe('Company Validator', () => {
  describe('validateCreateCompany', () => {
    it('should validate valid create company data', () => {
      const data = {
        nome: 'Empresa Teste',
        cnpj: '12345678000195',
      };

      const result = validateCreateCompany(data);
      expect(result).toEqual(data);
    });

    it('should accept optional fields', () => {
      const data = {
        nome: 'Empresa Teste',
        cnpj: '12345678000195',
        status: 'ativo',
        active: true,
      };

      const result = validateCreateCompany(data);
      expect(result).toEqual(data);
    });

    it('should throw error for missing nome', () => {
      const data = {
        cnpj: '12345678000195',
      };

      expect(() => validateCreateCompany(data)).toThrow('Dados inválidos');
    });

    it('should throw error for missing cnpj', () => {
      const data = {
        nome: 'Empresa Teste',
      };

      expect(() => validateCreateCompany(data)).toThrow('Dados inválidos');
    });

    it('should throw error for invalid cnpj length', () => {
      const data = {
        nome: 'Empresa Teste',
        cnpj: '123',
      };

      expect(() => validateCreateCompany(data)).toThrow('Dados inválidos');
    });
  });

  describe('validateUpdateCompany', () => {
    it('should validate valid update company data', () => {
      const data = {
        nome: 'Empresa Atualizada',
      };

      const result = validateUpdateCompany(data);
      expect(result).toEqual(data);
    });

    it('should accept empty update', () => {
      const result = validateUpdateCompany({});
      expect(result).toEqual({});
    });

    it('should accept partial update', () => {
      const data = {
        cnpj: '12345678000195',
        active: false,
      };

      const result = validateUpdateCompany(data);
      expect(result).toEqual(data);
    });
  });
});
