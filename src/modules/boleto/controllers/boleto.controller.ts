import { inject, injectable } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { BoletoService } from '../services/boleto.service';
import { CreateBoletoDTO, UpdateBoletoDTO, BoletoResponseDTO } from '../dto/boleto.dto';
import { validateCreateBoleto, validateUpdateBoleto } from '../validators/boleto.validator';
import { BoletoFileNotFoundError } from '../errors/boleto.errors';

const TEMP_DIR = path.resolve(__dirname, '..', '..', '..', '..', 'uploads', 'temp');
const UPLOADS_DIR = path.resolve(__dirname, '..', '..', '..', '..', 'uploads', 'pdfs');

function resolveBoletoPath(boleto: { company_id: string; nome_arquivo: string }): string {
  const newPath = path.join(UPLOADS_DIR, boleto.company_id, boleto.nome_arquivo);
  if (fs.existsSync(newPath)) return newPath;

  const dirs = fs.readdirSync(UPLOADS_DIR);
  const match = dirs.find(d => d.endsWith(`(${boleto.company_id})`));
  if (match) {
    return path.join(UPLOADS_DIR, match, boleto.nome_arquivo);
  }

  return newPath;
}

@injectable()
export class BoletoController {
  constructor(
    @inject('BoletoService')
    private readonly boletoService: BoletoService
  ) {}

  async findAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      // Only SUPERADMIN can list all boletos globally
      if (req.user?.role !== 'SUPERADMIN') {
        return res.status(403).json({ error: { message: 'Acesso negado. Apenas SUPERADMIN pode listar todos os boletos.' } });
      }
      const boletos = await this.boletoService.findAll();
      return res.json(boletos.map(BoletoResponseDTO.fromEntity));
    } catch (error) {
      return next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const boleto = await this.boletoService.findById(req.params.id);
      if (req.user?.role !== 'SUPERADMIN' && req.user?.companyId !== boleto.company_id) {
        return res.status(403).json({ error: { message: 'Acesso negado. Este boleto pertence a outra empresa.' } });
      }
      return res.json(BoletoResponseDTO.fromEntity(boleto));
    } catch (error) {
      return next(error);
    }
  }

  async findByCompany(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      if (req.user?.role !== 'SUPERADMIN' && req.user?.companyId !== req.params.companyId) {
        return res.status(403).json({ error: { message: 'Acesso negado. Voce nao pode consultar dados de outra empresa.' } });
      }
      const boletos = await this.boletoService.findByCompany(req.params.companyId);
      return res.json(boletos.map(BoletoResponseDTO.fromEntity));
    } catch (error) {
      return next(error);
    }
  }

  async upload(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      if (!req.file) {
        return res.status(400).json({ error: { message: 'Nenhum arquivo enviado.' } });
      }

      const input = CreateBoletoDTO.fromRequest(req, req.file.filename);
      if (req.user?.role !== 'SUPERADMIN' && req.user?.companyId !== input.company_id) {
        return res.status(403).json({ error: { message: 'Acesso negado. Voce nao pode enviar boletos para outra empresa.' } });
      }

      const validated = validateCreateBoleto(input);

      const companyDir = path.join(UPLOADS_DIR, validated.company_id);
      fs.mkdirSync(companyDir, { recursive: true });

      const finalPath = path.join(companyDir, req.file.filename);
      fs.renameSync(req.file.path, finalPath);

      const boleto = await this.boletoService.create(validated);
      return res.status(201).json(BoletoResponseDTO.fromEntity(boleto));
    } catch (error) {
      if (req.file) {
        try { fs.unlinkSync(req.file.path); } catch {}
      }
      return next(error);
    }
  }

  async download(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const boleto = await this.boletoService.findById(req.params.id);
      if (req.user?.role !== 'SUPERADMIN' && req.user?.companyId !== boleto.company_id) {
        return res.status(403).json({ error: { message: 'Acesso negado. Este boleto pertence a outra empresa.' } });
      }

      const filePath = resolveBoletoPath(boleto);

      if (!fs.existsSync(filePath)) {
        throw new BoletoFileNotFoundError(boleto.nome_arquivo);
      }

      return res.download(filePath, boleto.nome_arquivo);
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const boletoCheck = await this.boletoService.findById(req.params.id);
      if (req.user?.role !== 'SUPERADMIN' && req.user?.companyId !== boletoCheck.company_id) {
        return res.status(403).json({ error: { message: 'Acesso negado. Este boleto pertence a outra empresa.' } });
      }

      const input = UpdateBoletoDTO.fromRequest(req);
      const validated = validateUpdateBoleto(input);
      const boleto = await this.boletoService.update(req.params.id, validated);
      return res.json(BoletoResponseDTO.fromEntity(boleto));
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const boleto = await this.boletoService.findById(req.params.id);
      if (req.user?.role !== 'SUPERADMIN' && req.user?.companyId !== boleto.company_id) {
        return res.status(403).json({ error: { message: 'Acesso negado. Este boleto pertence a outra empresa.' } });
      }

      await this.boletoService.delete(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }

  async alterAtivo(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const boleto = await this.boletoService.findById(req.params.id);
      if (req.user?.role !== 'SUPERADMIN' && req.user?.companyId !== boleto.company_id) {
        return res.status(403).json({ error: { message: 'Acesso negado. Este boleto pertence a outra empresa.' } });
      }

      await this.boletoService.alterAtivo(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }
}
