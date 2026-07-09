import { validateCreateUserType, validateUpdateUserType, userTypeValues } from '@/modules/user-type/validators/user-type.validator';

describe('UserType Validator', () => {
  describe('validateCreateUserType', () => {
    it('should validate valid create userType data', () => {
      const data = {
        tipo: 'MASTER_DEVELOPER',
      };

      const result = validateCreateUserType(data);
      expect(result).toEqual(data);
    });

    it('should accept all valid tipo values', () => {
      userTypeValues.forEach((tipo) => {
        const data = { tipo };
        const result = validateCreateUserType(data);
        expect(result.tipo).toBe(tipo);
      });
    });

    it('should throw error for invalid tipo', () => {
      const data = {
        tipo: 'INVALID_TIPO',
      };

      expect(() => validateCreateUserType(data)).toThrow('Dados inválidos');
    });

    it('should accept optional active field', () => {
      const data = {
        tipo: 'PLATFORM_ADMIN',
        active: false,
      };

      const result = validateCreateUserType(data);
      expect(result).toEqual(data);
    });
  });

  describe('validateUpdateUserType', () => {
    it('should validate valid update userType data', () => {
      const data = {
        tipo: 'COMPANY_USER',
      };

      const result = validateUpdateUserType(data);
      expect(result).toEqual(data);
    });

    it('should accept empty update', () => {
      const result = validateUpdateUserType({});
      expect(result).toEqual({});
    });
  });
});
