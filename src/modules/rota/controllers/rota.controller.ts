import { inject, injectable } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { RotaService, ModuloRotaService } from '../services/rota.service';
import { RotaResponseDTO, ModuloRotaResponseDTO } from '../dto/rota.dto';
import { 
  validateCreateRota, validateUpdateRota, validateCreateModuloRota 
} from '../validators/rota.validator';

@injectable()
export class RotaController {
  constructor(
    @inject('RotaService')
    private readonly rotaService: RotaService
  ) {}

  async findAll(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const rotas = await this.rotaService.findAll();
      return res.json(rotas.map(RotaResponseDTO.fromEntity));
    } catch (error) {
      return next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const rota = await this.rotaService.findById(req.params.id);
      return res.json(RotaResponseDTO.fromEntity(rota));
    } catch (error) {
      return next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const validated = validateCreateRota(req.body);
      const rota = await this.rotaService.create(validated);
      return res.status(201).json(RotaResponseDTO.fromEntity(rota));
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const validated = validateUpdateRota(req.body);
      const rota = await this.rotaService.update(req.params.id, validated);
      return res.json(RotaResponseDTO.fromEntity(rota));
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      await this.rotaService.delete(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }

  async alterAtivo(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      await this.rotaService.alterAtivo(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }
}

@injectable()
export class ModuloRotaController {
  constructor(
    @inject('ModuloRotaService')
    private readonly moduloRotaService: ModuloRotaService
  ) {}

  async findAll(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const links = await this.moduloRotaService.findAll();
      return res.json(links.map(ModuloRotaResponseDTO.fromEntity));
    } catch (error) {
      return next(error);
    }
  }

  async findByModulo(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const links = await this.moduloRotaService.findByModuloId(req.params.moduloId);
      return res.json(links.map(ModuloRotaResponseDTO.fromEntity));
    } catch (error) {
      return next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const validated = validateCreateModuloRota(req.body);
      const link = await this.moduloRotaService.create(validated);
      return res.status(201).json(ModuloRotaResponseDTO.fromEntity(link));
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      await this.moduloRotaService.delete(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }
}
