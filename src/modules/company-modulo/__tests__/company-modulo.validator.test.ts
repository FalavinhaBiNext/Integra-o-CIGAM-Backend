import { validateCreateCompanyModulo, validateUpdateCompanyModulo } from '@/modules/company-modulo/validators/company-modulo.validator';

describe('CompanyModulo Validator', () => {
  describe('validateCreateCompanyModulo', () => {
    it('should validate valid create companyModulo data', () => {
      const data = {
        company_id: '550e8400-e29b-41d4-a716-446655440000',
        modulo_id: '550e8400-e29b-41d4-a716-446655440001',
      };

      const result = validateCreateCompanyModulo(data);
      expect(result).toEqual(data);
    });

    it('should throw error for invalid company_id', () => {
      const data = {
        company_id: 'invalid-uuid',
        modulo_id: '550e8400-e29b-41d4-a716-446655440001',
      };

      expect(() => validateCreateCompanyModulo(data)).toThrow('Dados inválidos');
    });

    it('should throw error for invalid modulo_id', () => {
      const data = {
        company_id: '550e8400-e29b-41d4-a716-446655440000',
        modulo_id: 'invalid-uuid',
      };

      expect(() => validateCreateCompanyModulo(data)).toThrow('Dados inválidos');
    });
  });

  describe('validateUpdateCompanyModulo', () => {
    it('should validate valid update companyModulo data', () => {
      const data = {
        active: false,
      };

      const result = validateUpdateCompanyModulo(data);
      expect(result).toEqual(data);
    });

    it('should accept empty update', () => {
      const result = validateUpdateCompanyModulo({});
      expect(result).toEqual({});
    });
  });
});
