import { CreateCompanyDTO, UpdateCompanyDTO, ResponseCompanyDTO } from '@/modules/company/dto/company.dto';

describe('Company DTO', () => {
  describe('CreateCompanyDTO.fromRequest', () => {
    it('should extract data from request body', () => {
      const req = {
        body: {
          nome: '  Empresa Teste  ',
          cnpj: '12345678000195',
          status: 'ativo',
          active: true,
        },
      } as any;

      const result = CreateCompanyDTO.fromRequest(req);
      expect(result).toEqual({
        nome: 'Empresa Teste',
        cnpj: '12345678000195',
        status: 'ativo',
        active: true,
      });
    });

    it('should handle missing optional fields', () => {
      const req = {
        body: {
          nome: 'Empresa Teste',
          cnpj: '12345678000195',
        },
      } as any;

      const result = CreateCompanyDTO.fromRequest(req);
      expect(result.nome).toBe('Empresa Teste');
      expect(result.cnpj).toBe('12345678000195');
      expect(result.status).toBeUndefined();
      expect(result.active).toBeUndefined();
    });
  });

  describe('UpdateCompanyDTO.fromRequest', () => {
    it('should extract data from request body', () => {
      const req = {
        body: {
          nome: 'Empresa Atualizada',
        },
      } as any;

      const result = UpdateCompanyDTO.fromRequest(req);
      expect(result).toEqual({
        nome: 'Empresa Atualizada',
      });
    });
  });

  describe('ResponseCompanyDTO.fromEntity', () => {
    it('should format entity to response', () => {
      const entity = {
        id: '123',
        nome: 'Empresa Teste',
        cnpj: '12345678000195',
        status: 'ativo',
        active: true,
        created_at: new Date('2026-01-01'),
        updated_at: new Date('2026-01-01'),
      } as any;

      const result = ResponseCompanyDTO.fromEntity(entity);
      expect(result).toEqual({
        id: '123',
        nome: 'Empresa Teste',
        cnpj: '12345678000195',
        status: 'ativo',
        active: true,
        created_at: new Date('2026-01-01'),
      });
    });
  });
});
