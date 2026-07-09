import { inject, injectable } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { CompanyModuloService } from '../services/company-modulo.service';
import { CreateCompanyModuloDTO, UpdateCompanyModuloDTO, CompanyModuloResponseDTO } from '../dto/company-modulo.dto';
import { validateCreateCompanyModulo, validateUpdateCompanyModulo } from '../validators/company-modulo.validator';

@injectable()
export class CompanyModuloController {
  constructor(
    @inject('CompanyModuloService')
    private readonly companyModuloService: CompanyModuloService
  ) {}

  async findAll(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const companyModulos = await this.companyModuloService.findAll();
      return res.json(companyModulos.map(CompanyModuloResponseDTO.fromEntity));
    } catch (error) {
      return next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const companyModulo = await this.companyModuloService.findById(req.params.id);
      return res.json(CompanyModuloResponseDTO.fromEntity(companyModulo));
    } catch (error) {
      return next(error);
    }
  }

  async findByCompany(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const companyModulos = await this.companyModuloService.findByCompany(req.params.companyId);
      return res.json(companyModulos.map(CompanyModuloResponseDTO.fromEntity));
    } catch (error) {
      return next(error);
    }
  }

  async findByModulo(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const companyModulos = await this.companyModuloService.findByModulo(req.params.moduloId);
      return res.json(companyModulos.map(CompanyModuloResponseDTO.fromEntity));
    } catch (error) {
      return next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const input = CreateCompanyModuloDTO.fromRequest(req);
      const validated = validateCreateCompanyModulo(input);
      const companyModulo = await this.companyModuloService.create(validated);
      return res.status(201).json(CompanyModuloResponseDTO.fromEntity(companyModulo));
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const input = UpdateCompanyModuloDTO.fromRequest(req);
      const validated = validateUpdateCompanyModulo(input);
      const companyModulo = await this.companyModuloService.update(req.params.id, validated);
      return res.json(CompanyModuloResponseDTO.fromEntity(companyModulo));
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      await this.companyModuloService.delete(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }

  async alterAtivo(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      await this.companyModuloService.alterAtivo(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }
}
