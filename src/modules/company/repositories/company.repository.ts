import { inject, injectable } from 'tsyringe';
import { CompanyModel } from '@/database/models/Company';
import { ICompanyRepository } from '../interfaces/company.interface';
import { CreateCompanyPersistenceDTO, UpdateCompanyPersistenceDTO } from '../dto/company.dto';

@injectable()
export class CompanyRepository implements ICompanyRepository {
  constructor(
    @inject('CompanyModel')
    private readonly model: typeof CompanyModel
  ) {}

  async findAll(): Promise<CompanyModel[]> {
    return this.model.findAll({ order: [['created_at', 'DESC']] });
  }

  async findById(id: string): Promise<CompanyModel | null> {
    return this.model.findByPk(id);
  }

  async findByCnpj(cnpj: string): Promise<CompanyModel | null> {
    return this.model.findOne({ where: { cnpj } });
  }

  async create(data: CreateCompanyPersistenceDTO): Promise<CompanyModel> {
    return this.model.create(data);
  }

  async update(id: string, data: UpdateCompanyPersistenceDTO): Promise<[number, CompanyModel[]]> {
    return this.model.update(data, { where: { id }, returning: true });
  }

  async delete(id: string): Promise<number> {
    return this.model.destroy({ where: { id } });
  }

  async alterAtivo(id: string, ativo: boolean): Promise<void> {
    await this.model.update({ active: ativo }, { where: { id } });
  }
}
