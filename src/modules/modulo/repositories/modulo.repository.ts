import { inject, injectable } from 'tsyringe';
import { ModuloModel } from '@/database/models/Modulo';
import { IModuloRepository } from '../interfaces/modulo.interface';
import { CreateModuloPersistenceDTO, UpdateModuloPersistenceDTO } from '../dto/modulo.dto';

@injectable()
export class ModuloRepository implements IModuloRepository {
  constructor(
    @inject('ModuloModel')
    private readonly model: typeof ModuloModel
  ) {}

  async findAll(): Promise<ModuloModel[]> {
    return this.model.findAll({ order: [['created_at', 'DESC']] });
  }

  async findById(id: string): Promise<ModuloModel | null> {
    return this.model.findByPk(id);
  }

  async findByNome(nome: string): Promise<ModuloModel | null> {
    return this.model.findOne({ where: { nome } });
  }

  async create(data: CreateModuloPersistenceDTO): Promise<ModuloModel> {
    return this.model.create(data);
  }

  async update(id: string, data: UpdateModuloPersistenceDTO): Promise<[number, ModuloModel[]]> {
    return this.model.update(data, { where: { id }, returning: true });
  }

  async delete(id: string): Promise<number> {
    return this.model.destroy({ where: { id } });
  }

  async alterAtivo(id: string, ativo: boolean): Promise<void> {
    await this.model.update({ active: ativo }, { where: { id } });
  }
}
