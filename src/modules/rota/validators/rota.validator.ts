import { z } from 'zod';
import { ValidationError } from '@/shared/errors/AppError';

export const createRotaSchema = z.object({
  nome: z.string().min(2).max(255),
  metodo: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
  caminho: z.string().min(1).max(255),
  active: z.boolean().optional(),
});

export const updateRotaSchema = z.object({
  nome: z.string().min(2).max(255).optional(),
  metodo: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']).optional(),
  caminho: z.string().min(1).max(255).optional(),
  active: z.boolean().optional(),
});

export const createModuloRotaSchema = z.object({
  modulo_id: z.string().uuid(),
  rota_id: z.string().uuid(),
});

export function validateCreateRota(input: unknown) {
  const result = createRotaSchema.safeParse(input);
  if (!result.success) {
    throw new ValidationError('Dados invalidos para criacao de rota.', result.error.flatten());
  }
  return result.data;
}

export function validateUpdateRota(input: unknown) {
  const result = updateRotaSchema.safeParse(input);
  if (!result.success) {
    throw new ValidationError('Dados invalidos para atualizacao de rota.', result.error.flatten());
  }
  return result.data;
}

export function validateCreateModuloRota(input: unknown) {
  const result = createModuloRotaSchema.safeParse(input);
  if (!result.success) {
    throw new ValidationError('Dados invalidos para associacao de rota a modulo.', result.error.flatten());
  }
  return result.data;
}
