import { inject, injectable } from 'tsyringe';
import { UserTypeModel } from '@/database/models/UserType';
import { IUserTypeRepository } from '../interfaces/user-type.interface';
import { CreateUserTypePersistenceDTO, UpdateUserTypePersistenceDTO } from '../dto/user-type.dto';

@injectable()
export class UserTypeRepository implements IUserTypeRepository {
  constructor(
    @inject('UserTypeModel')
    private readonly model: typeof UserTypeModel
  ) {}

  async findAll(): Promise<UserTypeModel[]> {
    return this.model.findAll({ order: [['created_at', 'DESC']] });
  }

  async findById(id: string): Promise<UserTypeModel | null> {
    return this.model.findByPk(id);
  }

  async findByTipo(tipo: string): Promise<UserTypeModel | null> {
    return this.model.findOne({ where: { tipo } });
  }

  async create(data: CreateUserTypePersistenceDTO): Promise<UserTypeModel> {
    return this.model.create(data);
  }

  async update(id: string, data: UpdateUserTypePersistenceDTO): Promise<[number, UserTypeModel[]]> {
    return this.model.update(data, { where: { id }, returning: true });
  }

  async delete(id: string): Promise<number> {
    return this.model.destroy({ where: { id } });
  }
}
