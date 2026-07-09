import { UserTypeModel } from '@/database/models/UserType';
import { CreateUserTypePersistenceDTO, UpdateUserTypePersistenceDTO } from '../dto/user-type.dto';

export interface IUserTypeRepository {
  findAll(): Promise<UserTypeModel[]>;
  findById(id: string): Promise<UserTypeModel | null>;
  findByTipo(tipo: string): Promise<UserTypeModel | null>;
  create(data: CreateUserTypePersistenceDTO): Promise<UserTypeModel>;
  update(id: string, data: UpdateUserTypePersistenceDTO): Promise<[number, UserTypeModel[]]>;
  delete(id: string): Promise<number>;
}
