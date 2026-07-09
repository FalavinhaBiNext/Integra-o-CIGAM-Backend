import { validateCreateCompanyIntegration, validateUpdateCompanyIntegration } from '@/modules/company-integration/validators/company-integration.validator';

describe('CompanyIntegration Validator', () => {
  describe('validateCreateCompanyIntegration', () => {
    it('should validate valid create companyIntegration data', () => {
      const data = {
        company_id: '550e8400-e29b-41d4-a716-446655440000',
        empresa: 'Cigam',
        login: 'admin',
        senha: '123456',
        url_portal: 'https://portal.cigam.com.br',
        token: 'abc123',
      };

      const result = validateCreateCompanyIntegration(data);
      expect(result).toEqual(data);
    });

    it('should accept optional status_conexao field', () => {
      const data = {
        company_id: '550e8400-e29b-41d4-a716-446655440000',
        empresa: 'Cigam',
        login: 'admin',
        senha: '123456',
        url_portal: 'https://portal.cigam.com.br',
        token: 'abc123',
        status_conexao: 'Conectado' as const,
      };

      const result = validateCreateCompanyIntegration(data);
      expect(result.status_conexao).toBe('Conectado');
    });

    it('should accept all valid status_conexao values', () => {
      const statuses = ['Conectado', 'Desconectado', 'Erro', 'Nao_Testado'] as const;
      statuses.forEach((status_conexao) => {
        const data = {
          company_id: '550e8400-e29b-41d4-a716-446655440000',
          empresa: 'Cigam',
          login: 'admin',
          senha: '123456',
          url_portal: 'https://portal.cigam.com.br',
          token: 'abc123',
          status_conexao,
        };
        const result = validateCreateCompanyIntegration(data);
        expect(result.status_conexao).toBe(status_conexao);
      });
    });

    it('should throw error for invalid status_conexao', () => {
      const data = {
        company_id: '550e8400-e29b-41d4-a716-446655440000',
        empresa: 'Cigam',
        login: 'admin',
        senha: '123456',
        url_portal: 'https://portal.cigam.com.br',
        token: 'abc123',
        status_conexao: 'INVALID_STATUS',
      };

      expect(() => validateCreateCompanyIntegration(data)).toThrow('Dados inválidos');
    });
  });

  describe('validateUpdateCompanyIntegration', () => {
    it('should validate valid update companyIntegration data', () => {
      const data = {
        empresa: 'Cigam Atualizada',
      };

      const result = validateUpdateCompanyIntegration(data);
      expect(result).toEqual(data);
    });

    it('should accept empty update', () => {
      const result = validateUpdateCompanyIntegration({});
      expect(result).toEqual({});
    });
  });
});
