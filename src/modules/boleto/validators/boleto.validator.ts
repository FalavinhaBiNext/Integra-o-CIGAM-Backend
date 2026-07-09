import { z } from 'zod';
import { ValidationError } from '@/shared/errors/AppError';

export const createBoletoSchema = z.object({
  company_id: z.string().uuid(),
  cnpj_cliente: z.string().min(14).max(18),
  empresa: z.string().min(1).max(255),
  telefone: z.string().min(1).max(20),
  contato: z.string().min(1).max(255),
  nome_arquivo: z.string().min(1).max(500),
  num_lancamento: z.string().min(1).max(100),
  vencimento: z.string().optional(),
  valor: z.string().optional(),
  codigo_empresa: z.string().optional(),
  data_recebimento: z.string().optional(),
  active: z.boolean().optional(),
});

export const updateBoletoSchema = z.object({
  cnpj_cliente: z.string().min(14).max(18).optional(),
  empresa: z.string().min(1).max(255).optional(),
  telefone: z.string().min(1).max(20).optional(),
  contato: z.string().min(1).max(255).optional(),
  num_lancamento: z.string().min(1).max(100).optional(),
  vencimento: z.string().optional(),
  valor: z.string().optional(),
  codigo_empresa: z.string().optional(),
  data_recebimento: z.string().optional(),
  active: z.boolean().optional(),
});

export function validateCreateBoleto(input: unknown) {
  const result = createBoletoSchema.safeParse(input);

  if (!result.success) {
    throw new ValidationError('Dados inválidos.', result.error.flatten());
  }

  return result.data;
}

export function validateUpdateBoleto(input: unknown) {
  const result = updateBoletoSchema.safeParse(input);

  if (!result.success) {
    throw new ValidationError('Dados inválidos.', result.error.flatten());
  }

  return result.data;
}
