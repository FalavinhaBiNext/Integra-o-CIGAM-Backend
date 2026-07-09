import { z } from 'zod';
import { ValidationError } from '@/shared/errors/AppError';

export const userTypeValues = ['MASTER_DEVELOPER', 'PLATFORM_ADMIN', 'COMPANY_USER'] as const;

export const createUserTypeSchema = z.object({
  tipo: z.enum(userTypeValues),
  active: z.boolean().optional(),
});

export const updateUserTypeSchema = z.object({
  tipo: z.enum(userTypeValues).optional(),
  active: z.boolean().optional(),
});

export function validateCreateUserType(input: unknown) {
  const result = createUserTypeSchema.safeParse(input);

  if (!result.success) {
    throw new ValidationError('Dados inválidos.', result.error.flatten());
  }

  return result.data;
}

export function validateUpdateUserType(input: unknown) {
  const result = updateUserTypeSchema.safeParse(input);

  if (!result.success) {
    throw new ValidationError('Dados inválidos.', result.error.flatten());
  }

  return result.data;
}
