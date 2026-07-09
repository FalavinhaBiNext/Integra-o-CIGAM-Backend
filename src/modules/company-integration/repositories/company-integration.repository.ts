import { inject, injectable } from 'tsyringe';
import { CompanyIntegrationModel } from '@/database/models/CompanyIntegration';
import { ICompanyIntegrationRepository } from '../interfaces/company-integration.interface';
import { CreateCompanyIntegrationPersistenceDTO, UpdateCompanyIntegrationPersistenceDTO } from '../dto/company-integration.dto';

@injectable()
export class CompanyIntegrationRepository implements ICompanyIntegrationRepository {
  constructor(
    @inject('CompanyIntegrationModel')
    private readonly model: typeof CompanyIntegrationModel
  ) {}

  async findAll(): Promise<CompanyIntegrationModel[]> {
    return this.model.findAll({ order: [['created_at', 'DESC']] });
  }

  async findById(id: string): Promise<CompanyIntegrationModel | null> {
    return this.model.findByPk(id);
  }

  async findByCompanyId(companyId: string): Promise<CompanyIntegrationModel | null> {
    return this.model.findOne({ where: { company_id: companyId } });
  }

  async create(data: CreateCompanyIntegrationPersistenceDTO): Promise<CompanyIntegrationModel> {
    return this.model.create(data);
  }

  async update(id: string, data: UpdateCompanyIntegrationPersistenceDTO): Promise<[number, CompanyIntegrationModel[]]> {
    return this.model.update(data, { where: { id }, returning: true });
  }

  async delete(id: string): Promise<number> {
    return this.model.destroy({ where: { id } });
  }

  async alterAtivo(id: string, ativo: boolean): Promise<void> {
    await this.model.update({ active: ativo }, { where: { id } });
  }
}
