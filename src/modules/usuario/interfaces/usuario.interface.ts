import { UsuarioModel } from '@/database/models/Usuario';
import { CreateUsuarioPersistenceDTO, UpdateUsuarioPersistenceDTO } from '../dto/usuario.dto';

export interface IUsuarioRepository {
  findAll(): Promise<UsuarioModel[]>;
  findById(id: string): Promise<UsuarioModel | null>;
  findByEmail(email: string): Promise<UsuarioModel | null>;
  findByCompanyId(companyId: string): Promise<UsuarioModel[]>;
  create(data: CreateUsuarioPersistenceDTO): Promise<UsuarioModel>;
  update(id: string, data: UpdateUsuarioPersistenceDTO): Promise<[number, UsuarioModel[]]>;
  delete(id: string): Promise<number>;
  alterAtivo(id: string, ativo: boolean): Promise<void>;
}
