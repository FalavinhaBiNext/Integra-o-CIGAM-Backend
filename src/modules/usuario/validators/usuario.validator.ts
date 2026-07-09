import { z } from 'zod';
import { ValidationError } from '@/shared/errors/AppError';

const usuarioRoleValues = ['MASTER', 'ADMIN', 'USER'] as const;

export const createUsuarioSchema = z.object({
  company_id: z.string().uuid(),
  nome: z.string().min(2).max(255),
  email: z.string().email().max(255),
  senha: z.string().min(6).max(255),
  role: z.enum(usuarioRoleValues).optional(),
  active: z.boolean().optional(),
});

export const updateUsuarioSchema = z.object({
  company_id: z.string().uuid().optional(),
  nome: z.string().min(2).max(255).optional(),
  email: z.string().email().max(255).optional(),
  senha: z.string().min(6).max(255).optional(),
  role: z.enum(usuarioRoleValues).optional(),
  active: z.boolean().optional(),
});

export function validateCreateUsuario(input: unknown) {
  const result = createUsuarioSchema.safeParse(input);

  if (!result.success) {
    throw new ValidationError('Dados inválidos.', result.error.flatten());
  }

  return result.data;
}

export function validateUpdateUsuario(input: unknown) {
  const result = updateUsuarioSchema.safeParse(input);

  if (!result.success) {
    throw new ValidationError('Dados inválidos.', result.error.flatten());
  }

  return result.data;
}
