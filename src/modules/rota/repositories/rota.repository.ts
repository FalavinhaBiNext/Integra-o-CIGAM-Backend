import { inject, injectable } from 'tsyringe';
import { RotaModel } from '@/database/models/Rota';
import { IRotaRepository } from '../interfaces/rota.interface';

@injectable()
export class RotaRepository implements IRotaRepository {
  constructor(
    @inject('RotaModel')
    private readonly model: typeof RotaModel
  ) {}

  async create(data: { nome: string; metodo: string; caminho: string; active?: boolean }): Promise<RotaModel> {
    return this.model.create(data);
  }

  async findAll(): Promise<RotaModel[]> {
    return this.model.findAll({ order: [['created_at', 'DESC']] });
  }

  async findById(id: string): Promise<RotaModel | null> {
    return this.model.findByPk(id);
  }

  async findByMethodAndPath(metodo: string, caminho: string): Promise<RotaModel | null> {
    return this.model.findOne({ where: { metodo, caminho } });
  }

  async update(id: string, data: { nome?: string; metodo?: string; caminho?: string; active?: boolean }): Promise<void> {
    await this.model.update(data, { where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.model.destroy({ where: { id } });
  }

  async alterAtivo(id: string, active: boolean): Promise<void> {
    await this.model.update({ active }, { where: { id } });
  }
}
