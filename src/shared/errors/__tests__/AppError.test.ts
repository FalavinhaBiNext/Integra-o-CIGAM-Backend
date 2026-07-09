import { AppError, ValidationError, NotFoundError, ConflictError, ExternalServiceError } from '@/shared/errors/AppError';

describe('AppError', () => {
  describe('AppError', () => {
    it('should create error with default status code', () => {
      const error = new AppError('Erro interno');
      expect(error.message).toBe('Erro interno');
      expect(error.statusCode).toBe(500);
      expect(error.isOperational).toBe(true);
      expect(error.name).toBe('AppError');
    });

    it('should create error with custom status code', () => {
      const error = new AppError('Erro customizado', 400);
      expect(error.statusCode).toBe(400);
    });

    it('should create error with details', () => {
      const details = { field: 'nome' };
      const error = new AppError('Erro com detalhes', 400, details);
      expect(error.details).toEqual(details);
    });
  });

  describe('ValidationError', () => {
    it('should create error with default message', () => {
      const error = new ValidationError();
      expect(error.message).toBe('Dados invalidos.');
      expect(error.statusCode).toBe(400);
      expect(error.name).toBe('ValidationError');
    });

    it('should create error with custom message', () => {
      const error = new ValidationError('Campos obrigatorios');
      expect(error.message).toBe('Campos obrigatorios');
    });

    it('should create error with details', () => {
      const details = { errors: ['nome e obrigatorio'] };
      const error = new ValidationError('Dados invalidos', details);
      expect(error.details).toEqual(details);
    });
  });

  describe('NotFoundError', () => {
    it('should create error with default message', () => {
      const error = new NotFoundError();
      expect(error.message).toBe('Recurso nao encontrado.');
      expect(error.statusCode).toBe(404);
      expect(error.name).toBe('NotFoundError');
    });

    it('should create error with custom message', () => {
      const error = new NotFoundError('Usuario nao encontrado');
      expect(error.message).toBe('Usuario nao encontrado');
    });
  });

  describe('ConflictError', () => {
    it('should create error with default message', () => {
      const error = new ConflictError();
      expect(error.message).toBe('Conflito de dados.');
      expect(error.statusCode).toBe(409);
      expect(error.name).toBe('ConflictError');
    });

    it('should create error with custom message', () => {
      const error = new ConflictError('Email ja cadastrado');
      expect(error.message).toBe('Email ja cadastrado');
    });
  });

  describe('ExternalServiceError', () => {
    it('should create error with default message', () => {
      const error = new ExternalServiceError();
      expect(error.message).toBe('Erro em servico externo.');
      expect(error.statusCode).toBe(502);
      expect(error.name).toBe('ExternalServiceError');
    });

    it('should create error from axios error', () => {
      const axiosError = new Error('Network Error');
      const error = ExternalServiceError.fromAxios(axiosError, 'Cigam API');
      expect(error.message).toBe('Erro na integracao com Cigam API.');
      expect(error.details).toBe(axiosError);
    });
  });
});
