import { inject, injectable } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { UsuarioService } from '../services/usuario.service';
import { CreateUsuarioDTO, UpdateUsuarioDTO, UsuarioResponseDTO } from '../dto/usuario.dto';
import { validateCreateUsuario, validateUpdateUsuario } from '../validators/usuario.validator';

@injectable()
export class UsuarioController {
  constructor(
    @inject('UsuarioService')
    private readonly usuarioService: UsuarioService
  ) {}

  async findAll(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const usuarios = await this.usuarioService.findAll();
      return res.json(usuarios.map(UsuarioResponseDTO.fromEntity));
    } catch (error) {
      return next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const usuario = await this.usuarioService.findById(req.params.id);
      return res.json(UsuarioResponseDTO.fromEntity(usuario));
    } catch (error) {
      return next(error);
    }
  }

  async findByCompany(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const usuarios = await this.usuarioService.findByCompany(req.params.companyId);
      return res.json(usuarios.map(UsuarioResponseDTO.fromEntity));
    } catch (error) {
      return next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const input = CreateUsuarioDTO.fromRequest(req);
      const validated = validateCreateUsuario(input);
      const usuario = await this.usuarioService.create(validated);
      return res.status(201).json(UsuarioResponseDTO.fromEntity(usuario));
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const input = UpdateUsuarioDTO.fromRequest(req);
      const validated = validateUpdateUsuario(input);
      const usuario = await this.usuarioService.update(req.params.id, validated);
      return res.json(UsuarioResponseDTO.fromEntity(usuario));
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      await this.usuarioService.delete(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }

  async alterAtivo(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      await this.usuarioService.alterAtivo(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }
}
