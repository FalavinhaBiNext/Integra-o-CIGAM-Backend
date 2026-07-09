import { inject, injectable } from 'tsyringe';
import { ICompanyModuloRepository } from '../interfaces/company-modulo.interface';
import {
  CreateCompanyModuloInputDTO,
  UpdateCompanyModuloInputDTO,
  CreateCompanyModuloPersistenceDTO,
  UpdateCompanyModuloPersistenceDTO,
} from '../dto/company-modulo.dto';
import { CompanyModuloNotFoundError, CompanyModuloConflictError } from '../errors/company-modulo.errors';
import { CompanyModuloModel } from '@/database/models/CompanyModulo';

@injectable()
export class CompanyModuloService {
  constructor(
    @inject('CompanyModuloRepository')
    private readonly companyModuloRepository: ICompanyModuloRepository
  ) {}

  async findAll(): Promise<CompanyModuloModel[]> {
    return this.companyModuloRepository.findAll();
  }

  async findById(id: string): Promise<CompanyModuloModel> {
    const companyModulo = await this.companyModuloRepository.findById(id);

    if (!companyModulo) {
      throw new CompanyModuloNotFoundError(id);
    }

    return companyModulo;
  }

  async findByCompany(companyId: string): Promise<CompanyModuloModel[]> {
    return this.companyModuloRepository.findByCompanyId(companyId);
  }

  async findByModulo(moduloId: string): Promise<CompanyModuloModel[]> {
    return this.companyModuloRepository.findByModuloId(moduloId);
  }

  async create(input: CreateCompanyModuloInputDTO): Promise<CompanyModuloModel> {
    const existingAssociation = await this.companyModuloRepository.findByCompanyAndModulo(
      input.company_id,
      input.modulo_id
    );

    if (existingAssociation) {
      throw new CompanyModuloConflictError(input.company_id, input.modulo_id);
    }

    const persistence: CreateCompanyModuloPersistenceDTO = {
      company_id: input.company_id,
      modulo_id: input.modulo_id,
      active: input.active ?? true,
    };

    return this.companyModuloRepository.create(persistence);
  }

  async update(id: string, input: UpdateCompanyModuloInputDTO): Promise<CompanyModuloModel> {
    const companyModulo = await this.companyModuloRepository.findById(id);

    if (!companyModulo) {
      throw new CompanyModuloNotFoundError(id);
    }

    if (input.company_id && input.modulo_id) {
      const existingAssociation = await this.companyModuloRepository.findByCompanyAndModulo(
        input.company_id,
        input.modulo_id
      );

      if (existingAssociation && existingAssociation.id !== id) {
        throw new CompanyModuloConflictError(input.company_id, input.modulo_id);
      }
    }

    const persistence: UpdateCompanyModuloPersistenceDTO = { ...input };

    const [, [updatedCompanyModulo]] = await this.companyModuloRepository.update(id, persistence);

    return updatedCompanyModulo;
  }

  async delete(id: string): Promise<void> {
    const companyModulo = await this.companyModuloRepository.findById(id);

    if (!companyModulo) {
      throw new CompanyModuloNotFoundError(id);
    }

    await this.companyModuloRepository.delete(id);
  }

  async alterAtivo(id: string): Promise<void> {
    const companyModulo = await this.companyModuloRepository.findById(id);

    if (!companyModulo) {
      throw new CompanyModuloNotFoundError(id);
    }

    const newStatus = !companyModulo.active;
    await this.companyModuloRepository.alterAtivo(id, newStatus);
  }
}
