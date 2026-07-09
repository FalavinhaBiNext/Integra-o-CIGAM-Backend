import { BoletoNotFoundError, BoletoFileNotFoundError } from '@/modules/boleto/errors/boleto.errors';

describe('Boleto Errors', () => {
  describe('BoletoNotFoundError', () => {
    it('should create error with correct message', () => {
      const error = new BoletoNotFoundError('123');
      expect(error.message).toBe('Boleto com id "123" não encontrado.');
      expect(error.statusCode).toBe(404);
    });
  });

  describe('BoletoFileNotFoundError', () => {
    it('should create error with correct message', () => {
      const error = new BoletoFileNotFoundError('boleto.pdf');
      expect(error.message).toBe('Arquivo "boleto.pdf" não encontrado.');
      expect(error.statusCode).toBe(404);
    });
  });
});
