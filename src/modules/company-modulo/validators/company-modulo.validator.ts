import { z } from 'zod';
import { ValidationError } from '@/shared/errors/AppError';

export const createCompanyModuloSchema = z.object({
  company_id: z.string().uuid(),
  modulo_id: z.string().uuid(),
  active: z.boolean().optional(),
});

export const updateCompanyModuloSchema = z.object({
  company_id: z.string().uuid().optional(),
  modulo_id: z.string().uuid().optional(),
  active: z.boolean().optional(),
});

export function validateCreateCompanyModulo(input: unknown) {
  const result = createCompanyModuloSchema.safeParse(input);

  if (!result.success) {
    throw new ValidationError('Dados inválidos.', result.error.flatten());
  }

  return result.data;
}

export function validateUpdateCompanyModulo(input: unknown) {
  const result = updateCompanyModuloSchema.safeParse(input);

  if (!result.success) {
    throw new ValidationError('Dados inválidos.', result.error.flatten());
  }

  return result.data;
}
