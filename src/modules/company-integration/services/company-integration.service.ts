import { inject, injectable } from 'tsyringe';
import { ICompanyIntegrationRepository } from '../interfaces/company-integration.interface';
import {
  CreateCompanyIntegrationInputDTO,
  UpdateCompanyIntegrationInputDTO,
  CreateCompanyIntegrationPersistenceDTO,
  UpdateCompanyIntegrationPersistenceDTO,
} from '../dto/company-integration.dto';
import { CompanyIntegrationNotFoundError, CompanyIntegrationConflictError } from '../errors/company-integration.errors';
import { CompanyIntegrationModel } from '@/database/models/CompanyIntegration';

@injectable()
export class CompanyIntegrationService {
  constructor(
    @inject('CompanyIntegrationRepository')
    private readonly companyIntegrationRepository: ICompanyIntegrationRepository
  ) {}

  async findAll(): Promise<CompanyIntegrationModel[]> {
    return this.companyIntegrationRepository.findAll();
  }

  async findById(id: string): Promise<CompanyIntegrationModel> {
    const integration = await this.companyIntegrationRepository.findById(id);

    if (!integration) {
      throw new CompanyIntegrationNotFoundError(id);
    }

    return integration;
  }

  async findByCompany(companyId: string): Promise<CompanyIntegrationModel | null> {
    return this.companyIntegrationRepository.findByCompanyId(companyId);
  }

  async create(input: CreateCompanyIntegrationInputDTO): Promise<CompanyIntegrationModel> {
    const existingIntegration = await this.companyIntegrationRepository.findByCompanyId(input.company_id);

    if (existingIntegration) {
      throw new CompanyIntegrationConflictError(input.company_id);
    }

    const persistence: CreateCompanyIntegrationPersistenceDTO = {
      company_id: input.company_id,
      empresa: input.empresa,
      login: input.login,
      senha: input.senha,
      url_portal: input.url_portal,
      token: input.token,
      status_conexao: input.status_conexao ?? 'Nao_Testado',
      active: input.active ?? true,
    };

    return this.companyIntegrationRepository.create(persistence);
  }

  async update(id: string, input: UpdateCompanyIntegrationInputDTO): Promise<CompanyIntegrationModel> {
    const integration = await this.companyIntegrationRepository.findById(id);

    if (!integration) {
      throw new CompanyIntegrationNotFoundError(id);
    }

    const persistence: UpdateCompanyIntegrationPersistenceDTO = { ...input };

    const [, [updatedIntegration]] = await this.companyIntegrationRepository.update(id, persistence);

    return updatedIntegration;
  }

  async delete(id: string): Promise<void> {
    const integration = await this.companyIntegrationRepository.findById(id);

    if (!integration) {
      throw new CompanyIntegrationNotFoundError(id);
    }

    await this.companyIntegrationRepository.delete(id);
  }

  async alterAtivo(id: string): Promise<void> {
    const integration = await this.companyIntegrationRepository.findById(id);

    if (!integration) {
      throw new CompanyIntegrationNotFoundError(id);
    }

    const newStatus = !integration.active;
    await this.companyIntegrationRepository.alterAtivo(id, newStatus);
  }
}
