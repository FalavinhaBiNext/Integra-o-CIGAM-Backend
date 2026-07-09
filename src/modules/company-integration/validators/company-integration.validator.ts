import { z } from 'zod';
import { ValidationError } from '@/shared/errors/AppError';

const statusConexaoValues = ['Conectado', 'Desconectado', 'Erro', 'Nao_Testado'] as const;

export const createCompanyIntegrationSchema = z.object({
  company_id: z.string().uuid(),
  empresa: z.string().min(1).max(255),
  login: z.string().min(1).max(255),
  senha: z.string().min(1).max(255),
  url_portal: z.string().min(1).max(500),
  token: z.string().min(1),
  status_conexao: z.enum(statusConexaoValues).optional(),
  active: z.boolean().optional(),
});

export const updateCompanyIntegrationSchema = z.object({
  company_id: z.string().uuid().optional(),
  empresa: z.string().min(1).max(255).optional(),
  login: z.string().min(1).max(255).optional(),
  senha: z.string().min(1).max(255).optional(),
  url_portal: z.string().min(1).max(500).optional(),
  token: z.string().min(1).optional(),
  status_conexao: z.enum(statusConexaoValues).optional(),
  active: z.boolean().optional(),
});

export function validateCreateCompanyIntegration(input: unknown) {
  const result = createCompanyIntegrationSchema.safeParse(input);

  if (!result.success) {
    throw new ValidationError('Dados inválidos.', result.error.flatten());
  }

  return result.data;
}

export function validateUpdateCompanyIntegration(input: unknown) {
  const result = updateCompanyIntegrationSchema.safeParse(input);

  if (!result.success) {
    throw new ValidationError('Dados inválidos.', result.error.flatten());
  }

  return result.data;
}
