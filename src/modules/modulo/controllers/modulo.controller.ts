import { inject, injectable } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { ModuloService } from '../services/modulo.service';
import { CreateModuloDTO, UpdateModuloDTO, ModuloResponseDTO } from '../dto/modulo.dto';
import { validateCreateModulo, validateUpdateModulo } from '../validators/modulo.validator';

@injectable()
export class ModuloController {
  constructor(
    @inject('ModuloService')
    private readonly moduloService: ModuloService
  ) {}

  async findAll(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const modulos = await this.moduloService.findAll();
      return res.json(modulos.map(ModuloResponseDTO.fromEntity));
    } catch (error) {
      return next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const modulo = await this.moduloService.findById(req.params.id);
      return res.json(ModuloResponseDTO.fromEntity(modulo));
    } catch (error) {
      return next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const input = CreateModuloDTO.fromRequest(req);
      const validated = validateCreateModulo(input);
      const modulo = await this.moduloService.create(validated);
      return res.status(201).json(ModuloResponseDTO.fromEntity(modulo));
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const input = UpdateModuloDTO.fromRequest(req);
      const validated = validateUpdateModulo(input);
      const modulo = await this.moduloService.update(req.params.id, validated);
      return res.json(ModuloResponseDTO.fromEntity(modulo));
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      await this.moduloService.delete(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }

  async alterAtivo(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      await this.moduloService.alterAtivo(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }
}
