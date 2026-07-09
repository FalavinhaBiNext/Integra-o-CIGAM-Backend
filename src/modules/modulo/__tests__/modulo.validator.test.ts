import { validateCreateModulo, validateUpdateModulo } from '@/modules/modulo/validators/modulo.validator';

describe('Modulo Validator', () => {
  describe('validateCreateModulo', () => {
    it('should validate valid create modulo data', () => {
      const data = {
        nome: 'Financeiro',
        descricao: 'Módulo de gestão financeira',
        icone: 'money',
      };

      const result = validateCreateModulo(data);
      expect(result).toEqual(data);
    });

    it('should accept optional active field', () => {
      const data = {
        nome: 'Financeiro',
        descricao: 'Módulo de gestão financeira',
        icone: 'money',
        active: false,
      };

      const result = validateCreateModulo(data);
      expect(result).toEqual(data);
    });

    it('should throw error for missing nome', () => {
      const data = {
        descricao: 'Módulo de gestão financeira',
        icone: 'money',
      };

      expect(() => validateCreateModulo(data)).toThrow('Dados inválidos');
    });

    it('should throw error for missing descricao', () => {
      const data = {
        nome: 'Financeiro',
        icone: 'money',
      };

      expect(() => validateCreateModulo(data)).toThrow('Dados inválidos');
    });

    it('should throw error for missing icone', () => {
      const data = {
        nome: 'Financeiro',
        descricao: 'Módulo de gestão financeira',
      };

      expect(() => validateCreateModulo(data)).toThrow('Dados inválidos');
    });
  });

  describe('validateUpdateModulo', () => {
    it('should validate valid update modulo data', () => {
      const data = {
        nome: 'Financeiro Atualizado',
      };

      const result = validateUpdateModulo(data);
      expect(result).toEqual(data);
    });

    it('should accept empty update', () => {
      const result = validateUpdateModulo({});
      expect(result).toEqual({});
    });
  });
});
