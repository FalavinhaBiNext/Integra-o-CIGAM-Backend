import { z } from 'zod';
import { ValidationError } from '@/shared/errors/AppError';

export const createCompanySchema = z.object({
  nome: z.string().min(2).max(255),
  cnpj: z.string().min(14).max(18),
  status: z.string().min(2).max(50).optional(),
  active: z.boolean().optional(),
});

export const updateCompanySchema = z.object({
  nome: z.string().min(2).max(255).optional(),
  cnpj: z.string().min(14).max(18).optional(),
  status: z.string().min(2).max(50).optional(),
  active: z.boolean().optional(),
});

export function validateCreateCompany(input: unknown) {
  const result = createCompanySchema.safeParse(input);

  if (!result.success) {
    throw new ValidationError('Dados inválidos.', result.error.flatten());
  }

  return result.data;
}

export function validateUpdateCompany(input: unknown) {
  const result = updateCompanySchema.safeParse(input);

  if (!result.success) {
    throw new ValidationError('Dados inválidos.', result.error.flatten());
  }

  return result.data;
}
