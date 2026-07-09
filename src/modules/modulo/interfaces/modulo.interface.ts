import { ModuloModel } from '@/database/models/Modulo';
import { CreateModuloPersistenceDTO, UpdateModuloPersistenceDTO } from '../dto/modulo.dto';

export interface IModuloRepository {
  findAll(): Promise<ModuloModel[]>;
  findById(id: string): Promise<ModuloModel | null>;
  findByNome(nome: string): Promise<ModuloModel | null>;
  create(data: CreateModuloPersistenceDTO): Promise<ModuloModel>;
  update(id: string, data: UpdateModuloPersistenceDTO): Promise<[number, ModuloModel[]]>;
  delete(id: string): Promise<number>;
  alterAtivo(id: string, ativo: boolean): Promise<void>;
}
