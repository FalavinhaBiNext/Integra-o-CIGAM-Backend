import { UserTypeNotFoundError, UserTypeTipoConflictError } from '@/modules/user-type/errors/user-type.errors';

describe('UserType Errors', () => {
  describe('UserTypeNotFoundError', () => {
    it('should create error with correct message', () => {
      const error = new UserTypeNotFoundError('123');
      expect(error.message).toBe('Tipo de usuário com id "123" não encontrado.');
      expect(error.statusCode).toBe(404);
    });
  });

  describe('UserTypeTipoConflictError', () => {
    it('should create error with correct message', () => {
      const error = new UserTypeTipoConflictError('MASTER');
      expect(error.message).toBe('Já existe um tipo de usuário cadastrado com o valor "MASTER".');
      expect(error.statusCode).toBe(409);
    });
  });
});
