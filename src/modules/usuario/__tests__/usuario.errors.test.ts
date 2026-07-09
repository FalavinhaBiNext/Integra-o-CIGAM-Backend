import { UsuarioNotFoundError, UsuarioEmailConflictError } from '@/modules/usuario/errors/usuario.errors';

describe('Usuario Errors', () => {
  describe('UsuarioNotFoundError', () => {
    it('should create error with correct message', () => {
      const error = new UsuarioNotFoundError('123');
      expect(error.message).toBe('Usuário com id "123" não encontrado.');
      expect(error.statusCode).toBe(404);
    });
  });

  describe('UsuarioEmailConflictError', () => {
    it('should create error with correct message', () => {
      const error = new UsuarioEmailConflictError('teste@email.com');
      expect(error.message).toBe('Já existe um usuário cadastrado com o e-mail "teste@email.com".');
      expect(error.statusCode).toBe(409);
    });
  });
});
