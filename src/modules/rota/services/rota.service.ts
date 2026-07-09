import { inject, injectable } from 'tsyringe';
import { IRotaRepository, IModuloRotaRepository } from '../interfaces/rota.interface';
import { CreateRotaInputDTO, UpdateRotaInputDTO, CreateModuloRotaInputDTO } from '../dto/rota.dto';
import { RotaModel } from '@/database/models/Rota';
import { ModuloRotaModel } from '@/database/models/ModuloRota';
import { ConflictError, NotFoundError } from '@/shared/errors/AppError';

@injectable()
export class RotaService {
  constructor(
    @inject('RotaRepository')
    private readonly rotaRepository: IRotaRepository
  ) {}

  async create(data: CreateRotaInputDTO): Promise<RotaModel> {
    const existing = await this.rotaRepository.findByMethodAndPath(data.metodo, data.caminho);
    if (existing) {
      throw new ConflictError('Rota ja cadastrada com este metodo e caminho.');
    }
    return this.rotaRepository.create(data);
  }

  async findAll(): Promise<RotaModel[]> {
    return this.rotaRepository.findAll();
  }

  async findById(id: string): Promise<RotaModel> {
    const rota = await this.rotaRepository.findById(id);
    if (!rota) {
      throw new NotFoundError(`Rota com o ID ${id} nao encontrada.`);
    }
    return rota;
  }

  async update(id: string, data: UpdateRotaInputDTO): Promise<RotaModel> {
    const rota = await this.findById(id);

    if (data.metodo && data.caminho) {
      const existing = await this.rotaRepository.findByMethodAndPath(data.metodo, data.caminho);
      if (existing && existing.id !== id) {
        throw new ConflictError('Outra rota ja existe cadastrada com este metodo e caminho.');
      }
    }

    await this.rotaRepository.update(id, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.rotaRepository.delete(id);
  }

  async alterAtivo(id: string): Promise<void> {
    const rota = await this.findById(id);
    await this.rotaRepository.alterAtivo(id, !rota.active);
  }
}

@injectable()
export class ModuloRotaService {
  constructor(
    @inject('ModuloRotaRepository')
    private readonly moduloRotaRepository: IModuloRotaRepository
  ) {}

  async create(data: CreateModuloRotaInputDTO): Promise<ModuloRotaModel> {
    const existing = await this.moduloRotaRepository.findAssociation(data.modulo_id, data.rota_id);
    if (existing) {
      throw new ConflictError('Esta rota ja esta associada a este modulo.');
    }
    return this.moduloRotaRepository.create(data);
  }

  async findAll(): Promise<ModuloRotaModel[]> {
    return this.moduloRotaRepository.findAll();
  }

  async findByModuloId(moduloId: string): Promise<ModuloRotaModel[]> {
    return this.moduloRotaRepository.findByModuloId(moduloId);
  }

  async delete(id: string): Promise<void> {
    const link = await this.moduloRotaRepository.findById(id);
    if (!link) {
      throw new NotFoundError(`Associacao com o ID ${id} nao encontrada.`);
    }
    await this.moduloRotaRepository.delete(id);
  }
}
