import { inject, injectable } from 'tsyringe';
import { CompanyModuloModel } from '@/database/models/CompanyModulo';
import { ICompanyModuloRepository } from '../interfaces/company-modulo.interface';
import { CreateCompanyModuloPersistenceDTO, UpdateCompanyModuloPersistenceDTO } from '../dto/company-modulo.dto';

@injectable()
export class CompanyModuloRepository implements ICompanyModuloRepository {
  constructor(
    @inject('CompanyModuloModel')
    private readonly model: typeof CompanyModuloModel
  ) {}

  async findAll(): Promise<CompanyModuloModel[]> {
    return this.model.findAll({ order: [['created_at', 'DESC']] });
  }

  async findById(id: string): Promise<CompanyModuloModel | null> {
    return this.model.findByPk(id);
  }

  async findByCompanyId(companyId: string): Promise<CompanyModuloModel[]> {
    return this.model.findAll({ where: { company_id: companyId }, order: [['created_at', 'DESC']] });
  }

  async findByModuloId(moduloId: string): Promise<CompanyModuloModel[]> {
    return this.model.findAll({ where: { modulo_id: moduloId }, order: [['created_at', 'DESC']] });
  }

  async findByCompanyAndModulo(companyId: string, moduloId: string): Promise<CompanyModuloModel | null> {
    return this.model.findOne({ where: { company_id: companyId, modulo_id: moduloId } });
  }

  async create(data: CreateCompanyModuloPersistenceDTO): Promise<CompanyModuloModel> {
    return this.model.create(data);
  }

  async update(id: string, data: UpdateCompanyModuloPersistenceDTO): Promise<[number, CompanyModuloModel[]]> {
    return this.model.update(data, { where: { id }, returning: true });
  }

  async delete(id: string): Promise<number> {
    return this.model.destroy({ where: { id } });
  }

  async alterAtivo(id: string, ativo: boolean): Promise<void> {
    await this.model.update({ active: ativo }, { where: { id } });
  }
}
