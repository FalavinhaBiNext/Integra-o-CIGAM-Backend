import { z } from 'zod';
import { ValidationError } from '@/shared/errors/AppError';

export const createModuloSchema = z.object({
  nome: z.string().min(2).max(255),
  descricao: z.string().min(2).max(500),
  icone: z.string().min(1).max(100),
  active: z.boolean().optional(),
});

export const updateModuloSchema = z.object({
  nome: z.string().min(2).max(255).optional(),
  descricao: z.string().min(2).max(500).optional(),
  icone: z.string().min(1).max(100).optional(),
  active: z.boolean().optional(),
});

export function validateCreateModulo(input: unknown) {
  const result = createModuloSchema.safeParse(input);

  if (!result.success) {
    throw new ValidationError('Dados inválidos.', result.error.flatten());
  }

  return result.data;
}

export function validateUpdateModulo(input: unknown) {
  const result = updateModuloSchema.safeParse(input);

  if (!result.success) {
    throw new ValidationError('Dados inválidos.', result.error.flatten());
  }

  return result.data;
}
