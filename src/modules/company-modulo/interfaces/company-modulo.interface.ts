import { CompanyModuloModel } from '@/database/models/CompanyModulo';
import { CreateCompanyModuloPersistenceDTO, UpdateCompanyModuloPersistenceDTO } from '../dto/company-modulo.dto';

export interface ICompanyModuloRepository {
  findAll(): Promise<CompanyModuloModel[]>;
  findById(id: string): Promise<CompanyModuloModel | null>;
  findByCompanyId(companyId: string): Promise<CompanyModuloModel[]>;
  findByModuloId(moduloId: string): Promise<CompanyModuloModel[]>;
  findByCompanyAndModulo(companyId: string, moduloId: string): Promise<CompanyModuloModel | null>;
  create(data: CreateCompanyModuloPersistenceDTO): Promise<CompanyModuloModel>;
  update(id: string, data: UpdateCompanyModuloPersistenceDTO): Promise<[number, CompanyModuloModel[]]>;
  delete(id: string): Promise<number>;
  alterAtivo(id: string, ativo: boolean): Promise<void>;
}
