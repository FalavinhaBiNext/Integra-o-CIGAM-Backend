import { CompanyIntegrationModel } from '@/database/models/CompanyIntegration';
import { CreateCompanyIntegrationPersistenceDTO, UpdateCompanyIntegrationPersistenceDTO } from '../dto/company-integration.dto';

export interface ICompanyIntegrationRepository {
  findAll(): Promise<CompanyIntegrationModel[]>;
  findById(id: string): Promise<CompanyIntegrationModel | null>;
  findByCompanyId(companyId: string): Promise<CompanyIntegrationModel | null>;
  create(data: CreateCompanyIntegrationPersistenceDTO): Promise<CompanyIntegrationModel>;
  update(id: string, data: UpdateCompanyIntegrationPersistenceDTO): Promise<[number, CompanyIntegrationModel[]]>;
  delete(id: string): Promise<number>;
  alterAtivo(id: string, ativo: boolean): Promise<void>;
}
