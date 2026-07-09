import { z } from 'zod';
import { ValidationError } from '@/shared/errors/AppError';

export const loginSchema = z.object({
  email: z.string().email('E-mail invalido'),
  senha: z.string().min(6, 'Senha deve ter no minimo 6 caracteres'),
});

export function validateLogin(input: unknown) {
  const result = loginSchema.safeParse(input);

  if (!result.success) {
    throw new ValidationError('Dados invalidos.', result.error.flatten());
  }

  return result.data;
}
