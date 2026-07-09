import { validateCreateUsuario, validateUpdateUsuario } from '@/modules/usuario/validators/usuario.validator';

describe('Usuario Validator', () => {
  describe('validateCreateUsuario', () => {
    it('should validate valid create usuario data', () => {
      const data = {
        company_id: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Usuário Teste',
        email: 'teste@email.com',
        senha: '123456',
      };

      const result = validateCreateUsuario(data);
      expect(result).toEqual(data);
    });

    it('should accept optional role field', () => {
      const data = {
        company_id: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Usuário Teste',
        email: 'teste@email.com',
        senha: '123456',
        role: 'ADMIN' as const,
      };

      const result = validateCreateUsuario(data);
      expect(result.role).toBe('ADMIN');
    });

    it('should throw error for invalid email', () => {
      const data = {
        company_id: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Usuário Teste',
        email: 'invalid-email',
        senha: '123456',
      };

      expect(() => validateCreateUsuario(data)).toThrow('Dados inválidos');
    });

    it('should throw error for short password', () => {
      const data = {
        company_id: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Usuário Teste',
        email: 'teste@email.com',
        senha: '123',
      };

      expect(() => validateCreateUsuario(data)).toThrow('Dados inválidos');
    });

    it('should throw error for invalid company_id', () => {
      const data = {
        company_id: 'invalid-uuid',
        nome: 'Usuário Teste',
        email: 'teste@email.com',
        senha: '123456',
      };

      expect(() => validateCreateUsuario(data)).toThrow('Dados inválidos');
    });
  });

  describe('validateUpdateUsuario', () => {
    it('should validate valid update usuario data', () => {
      const data = {
        nome: 'Usuário Atualizado',
      };

      const result = validateUpdateUsuario(data);
      expect(result).toEqual(data);
    });

    it('should accept empty update', () => {
      const result = validateUpdateUsuario({});
      expect(result).toEqual({});
    });
  });
});
