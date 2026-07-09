import { NotFoundError } from '@/shared/errors/AppError';

export class BoletoNotFoundError extends NotFoundError {
  constructor(id: string) {
    super(`Boleto com id "${id}" não encontrado.`);
  }
}

export class BoletoFileNotFoundError extends NotFoundError {
  constructor(filename: string) {
    super(`Arquivo "${filename}" não encontrado.`);
  }
}
