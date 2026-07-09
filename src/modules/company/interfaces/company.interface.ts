import { CompanyModel } from '@/database/models/Company';
import { CreateCompanyPersistenceDTO, UpdateCompanyPersistenceDTO } from '../dto/company.dto';

export interface ICompanyRepository {
  findAll(): Promise<CompanyModel[]>;
  findById(id: string): Promise<CompanyModel | null>;
  findByCnpj(cnpj: string): Promise<CompanyModel | null>;
  create(data: CreateCompanyPersistenceDTO): Promise<CompanyModel>;
  update(id: string, data: UpdateCompanyPersistenceDTO): Promise<[number, CompanyModel[]]>;
  delete(id: string): Promise<number>;
  alterAtivo(id: string, ativo: boolean): Promise<void>;
}
