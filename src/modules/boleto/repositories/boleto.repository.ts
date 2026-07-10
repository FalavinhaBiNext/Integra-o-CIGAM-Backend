import { inject, injectable } from 'tsyringe';
import { BoletoModel } from '@/database/models/Boleto';
import { IBoletoRepository } from '../interfaces/boleto.interface';
import { CreateBoletoPersistenceDTO, UpdateBoletoPersistenceDTO } from '../dto/boleto.dto';

@injectable()
export class BoletoRepository implements IBoletoRepository {
  constructor(
    @inject('BoletoModel')
    private readonly model: typeof BoletoModel
  ) {}

  async findAll(): Promise<BoletoModel[]> {
    return this.model.findAll({ order: [['created_at', 'DESC']] });
  }

  async findById(id: string): Promise<BoletoModel | null> {
    return this.model.findByPk(id);
  }

  async findByCompanyId(companyId: string): Promise<BoletoModel[]> {
    return this.model.findAll({ where: { company_id: companyId }, order: [['created_at', 'DESC']] });
  }

  async findByCompanyAndNumLancamento(companyId: string, numLancamento: string): Promise<BoletoModel | null> {
    return this.model.findOne({
      where: { company_id: companyId, num_lancamento: numLancamento },
    });
  }

  async create(data: CreateBoletoPersistenceDTO): Promise<BoletoModel> {
    return this.model.create(data);
  }

  async update(id: string, data: UpdateBoletoPersistenceDTO): Promise<[number, BoletoModel[]]> {
    return this.model.update(data, { where: { id }, returning: true });
  }

  async delete(id: string): Promise<number> {
    return this.model.destroy({ where: { id } });
  }

  async alterAtivo(id: string, ativo: boolean): Promise<void> {
    await this.model.update({ active: ativo }, { where: { id } });
  }
}
