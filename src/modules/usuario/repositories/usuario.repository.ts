import { inject, injectable } from 'tsyringe';
import { UsuarioModel } from '@/database/models/Usuario';
import { IUsuarioRepository } from '../interfaces/usuario.interface';
import { CreateUsuarioPersistenceDTO, UpdateUsuarioPersistenceDTO } from '../dto/usuario.dto';

@injectable()
export class UsuarioRepository implements IUsuarioRepository {
  constructor(
    @inject('UsuarioModel')
    private readonly model: typeof UsuarioModel
  ) {}

  async findAll(): Promise<UsuarioModel[]> {
    return this.model.findAll({ order: [['created_at', 'DESC']] });
  }

  async findById(id: string): Promise<UsuarioModel | null> {
    return this.model.findByPk(id);
  }

  async findByEmail(email: string): Promise<UsuarioModel | null> {
    return this.model.findOne({ where: { email } });
  }

  async findByCompanyId(companyId: string): Promise<UsuarioModel[]> {
    return this.model.findAll({ where: { company_id: companyId }, order: [['created_at', 'DESC']] });
  }

  async create(data: CreateUsuarioPersistenceDTO): Promise<UsuarioModel> {
    return this.model.create(data);
  }

  async update(id: string, data: UpdateUsuarioPersistenceDTO): Promise<[number, UsuarioModel[]]> {
    return this.model.update(data, { where: { id }, returning: true });
  }

  async delete(id: string): Promise<number> {
    return this.model.destroy({ where: { id } });
  }

  async alterAtivo(id: string, ativo: boolean): Promise<void> {
    await this.model.update({ active: ativo }, { where: { id } });
  }
}
