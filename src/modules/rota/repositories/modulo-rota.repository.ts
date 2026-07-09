import { inject, injectable } from 'tsyringe';
import { ModuloRotaModel } from '@/database/models/ModuloRota';
import { RotaModel } from '@/database/models/Rota';
import { IModuloRotaRepository } from '../interfaces/rota.interface';

@injectable()
export class ModuloRotaRepository implements IModuloRotaRepository {
  constructor(
    @inject('ModuloRotaModel')
    private readonly model: typeof ModuloRotaModel
  ) {}

  async create(data: { modulo_id: string; rota_id: string; active?: boolean }): Promise<ModuloRotaModel> {
    return this.model.create(data);
  }

  async findAll(): Promise<ModuloRotaModel[]> {
    return this.model.findAll({ 
      include: [{ model: RotaModel, as: 'rota' }],
      order: [['created_at', 'DESC']] 
    });
  }

  async findById(id: string): Promise<ModuloRotaModel | null> {
    return this.model.findByPk(id, {
      include: [{ model: RotaModel, as: 'rota' }]
    });
  }

  async findByModuloId(moduloId: string): Promise<ModuloRotaModel[]> {
    return this.model.findAll({ 
      where: { modulo_id: moduloId },
      include: [{ model: RotaModel, as: 'rota' }],
      order: [['created_at', 'DESC']]
    });
  }

  async findAssociation(moduloId: string, rotaId: string): Promise<ModuloRotaModel | null> {
    return this.model.findOne({ where: { modulo_id: moduloId, rota_id: rotaId } });
  }

  async delete(id: string): Promise<void> {
    await this.model.destroy({ where: { id } });
  }
}
