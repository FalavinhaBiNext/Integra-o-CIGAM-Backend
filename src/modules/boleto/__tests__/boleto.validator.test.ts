import { validateCreateBoleto, validateUpdateBoleto } from '@/modules/boleto/validators/boleto.validator';

describe('Boleto Validator', () => {
  describe('validateCreateBoleto', () => {
    it('should validate valid create boleto data', () => {
      const data = {
        company_id: '550e8400-e29b-41d4-a716-446655440000',
        cnpj_cliente: '12345678000195',
        empresa: 'Empresa Teste',
        telefone: '11999999999',
        contato: 'João Silva',
        nome_arquivo: '1234567890_abc.pdf',
        num_lancamento: 'LANC-001',
      };

      const result = validateCreateBoleto(data);
      expect(result).toEqual(data);
    });

    it('should accept optional fields', () => {
      const data = {
        company_id: '550e8400-e29b-41d4-a716-446655440000',
        cnpj_cliente: '12345678000195',
        empresa: 'Empresa Teste',
        telefone: '11999999999',
        contato: 'João Silva',
        nome_arquivo: '1234567890_abc.pdf',
        num_lancamento: 'LANC-001',
        vencimento: '2026-12-31',
        valor: '1500.00',
        codigo_empresa: 'EMP-001',
        data_recebimento: '2026-06-24',
      };

      const result = validateCreateBoleto(data);
      expect(result).toEqual(data);
    });

    it('should throw error for missing required fields', () => {
      const data = {
        company_id: '550e8400-e29b-41d4-a716-446655440000',
      };

      expect(() => validateCreateBoleto(data)).toThrow('Dados inválidos');
    });

    it('should throw error for invalid cnpj length', () => {
      const data = {
        company_id: '550e8400-e29b-41d4-a716-446655440000',
        cnpj_cliente: '123',
        empresa: 'Empresa Teste',
        telefone: '11999999999',
        contato: 'João Silva',
        nome_arquivo: '1234567890_abc.pdf',
        num_lancamento: 'LANC-001',
      };

      expect(() => validateCreateBoleto(data)).toThrow('Dados inválidos');
    });
  });

  describe('validateUpdateBoleto', () => {
    it('should validate valid update boleto data', () => {
      const data = {
        empresa: 'Empresa Atualizada',
        valor: '2000.00',
      };

      const result = validateUpdateBoleto(data);
      expect(result).toEqual(data);
    });

    it('should accept empty update', () => {
      const result = validateUpdateBoleto({});
      expect(result).toEqual({});
    });
  });
});
