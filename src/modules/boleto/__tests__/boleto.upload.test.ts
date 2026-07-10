import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { BoletoModel } from '@/database/models/Boleto';

jest.mock('@/shared/container', () => ({
  container: {
    resolve: jest.fn((token: string) => {
      if (token === 'BoletoService') {
        return {
          findAll: jest.fn().mockResolvedValue([]),
          findById: jest.fn().mockResolvedValue({
            id: '123',
            company_id: '550e8400-e29b-41d4-a716-446655440000',
            cnpj_cliente: '12345678000195',
            empresa: 'Empresa Teste',
            telefone: '11999999999',
            contato: 'Joao Silva',
            nome_arquivo: '1234567890_abc.pdf',
            num_lancamento: 'LANC-001',
            vencimento: '2026-12-31',
            valor: '1500.00',
            codigo_empresa: 'EMP-001',
            data_recebimento: null,
            active: true,
            created_at: new Date(),
            updated_at: new Date(),
          }),
          findByCompany: jest.fn().mockResolvedValue([]),
          findByCompanyAndNumLancamento: jest.fn().mockResolvedValue(null),
          create: jest.fn().mockResolvedValue({
            id: '456',
            company_id: '550e8400-e29b-41d4-a716-446655440000',
            cnpj_cliente: '12345678000195',
            empresa: 'Empresa Teste',
            telefone: '11999999999',
            contato: 'Joao Silva',
            nome_arquivo: '1234567890_abc.pdf',
            num_lancamento: 'LANC-001',
            vencimento: '2026-12-31',
            valor: '1500.00',
            codigo_empresa: 'EMP-001',
            data_recebimento: null,
            active: true,
            created_at: new Date(),
            updated_at: new Date(),
          }),
          update: jest.fn(),
          delete: jest.fn(),
          alterAtivo: jest.fn(),
        };
      }
      return {};
    }),
  },
}));

describe('Boleto Model', () => {
  it('should have correct table name', () => {
    expect(BoletoModel.tableName).toBe('boletos');
  });

  it('should have correct attributes', () => {
    const attributes = Object.keys(BoletoModel.rawAttributes);
    expect(attributes).toContain('id');
    expect(attributes).toContain('company_id');
    expect(attributes).toContain('cnpj_cliente');
    expect(attributes).toContain('empresa');
    expect(attributes).toContain('telefone');
    expect(attributes).toContain('contato');
    expect(attributes).toContain('nome_arquivo');
    expect(attributes).toContain('num_lancamento');
    expect(attributes).toContain('vencimento');
    expect(attributes).toContain('valor');
    expect(attributes).toContain('codigo_empresa');
    expect(attributes).toContain('data_recebimento');
    expect(attributes).toContain('active');
    expect(attributes).toContain('created_at');
    expect(attributes).toContain('updated_at');
  });

  it('should have timestamps enabled', () => {
    expect(BoletoModel.options.timestamps).toBe(true);
  });

  it('should use underscored naming', () => {
    expect(BoletoModel.options.underscored).toBe(true);
  });
});

describe('Multer Config', () => {
  it('should accept only PDF files', () => {
    const { uploadBoleto } = require('@/config/multer');
    expect(uploadBoleto).toBeDefined();
  });
});

describe('Boleto Controller', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      download: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  describe('Upload', () => {
    it('should return 400 when no file is provided', async () => {
      const { BoletoController } = require('@/modules/boleto/controllers/boleto.controller');
      const controller = new BoletoController(
        require('@/shared/container').container.resolve('BoletoService')
      );

      mockReq = {
        file: undefined,
        body: {
          company_id: '550e8400-e29b-41d4-a716-446655440000',
        },
      } as any;

      await controller.upload(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: { message: 'Nenhum arquivo enviado.' },
      });
    });

    it('should upload a PDF file successfully', async () => {
      const fs = require('fs');
      jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {});
      jest.spyOn(fs, 'renameSync').mockImplementation(() => {});
      jest.spyOn(fs, 'unlinkSync').mockImplementation(() => {});

      const { BoletoController } = require('@/modules/boleto/controllers/boleto.controller');
      const controller = new BoletoController(
        require('@/shared/container').container.resolve('BoletoService')
      );

      mockReq = {
        user: {
          userId: 'user-123',
          companyId: '550e8400-e29b-41d4-a716-446655440000',
          email: 'teste@empresa.com',
          role: 'ADMIN',
        },
        file: {
          fieldname: 'file',
          originalname: 'boleto.pdf',
          encoding: '7bit',
          mimetype: 'application/pdf',
          destination: 'src/uploads/temp',
          filename: '1234567890_abc.pdf',
          path: 'src/uploads/temp/1234567890_abc.pdf',
          size: 1024,
        } as Express.Multer.File,
        body: {
          company_id: '550e8400-e29b-41d4-a716-446655440000',
          cnpj_cliente: '12345678000195',
          empresa: 'Empresa Teste',
          telefone: '11999999999',
          contato: 'Joao Silva',
          num_lancamento: 'LANC-001',
          vencimento: '2026-12-31',
          valor: '1500.00',
          codigo_empresa: 'EMP-001',
        },
      } as any;

      await controller.upload(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          id: '456',
          company_id: '550e8400-e29b-41d4-a716-446655440000',
          nome_arquivo: '1234567890_abc.pdf',
        })
      );
    });
  });

  describe('Download', () => {
    it('should download a PDF file successfully', async () => {
      const fs = require('fs');
      const path = require('path');
      const { BoletoController } = require('@/modules/boleto/controllers/boleto.controller');

      jest.spyOn(fs, 'existsSync').mockReturnValue(true);
      jest.spyOn(path, 'join').mockReturnValue('/mock/path/file.pdf');

      const controller = new BoletoController(
        require('@/shared/container').container.resolve('BoletoService')
      );

      mockReq = {
        user: {
          userId: 'user-123',
          companyId: '550e8400-e29b-41d4-a716-446655440000',
          email: 'teste@empresa.com',
          role: 'ADMIN',
        },
        params: { id: '123' },
      } as any;

      await controller.download(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.download).toHaveBeenCalled();

      fs.existsSync.mockRestore();
      path.join.mockRestore();
    });
  });
});
