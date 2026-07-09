import { ModuloNotFoundError, ModuloNomeConflictError } from '@/modules/modulo/errors/modulo.errors';

describe('Modulo Errors', () => {
  describe('ModuloNotFoundError', () => {
    it('should create error with correct message', () => {
      const error = new ModuloNotFoundError('123');
      expect(error.message).toBe('Módulo com id "123" não encontrado.');
      expect(error.statusCode).toBe(404);
    });
  });

  describe('ModuloNomeConflictError', () => {
    it('should create error with correct message', () => {
      const error = new ModuloNomeConflictError('Financeiro');
      expect(error.message).toBe('Já existe um módulo cadastrado com o nome "Financeiro".');
      expect(error.statusCode).toBe(409);
    });
  });
});
