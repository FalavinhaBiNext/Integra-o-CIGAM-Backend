import { inject, injectable } from 'tsyringe';
import { IBoletoRepository } from '../interfaces/boleto.interface';
import {
  CreateBoletoInputDTO,
  UpdateBoletoInputDTO,
  CreateBoletoPersistenceDTO,
  UpdateBoletoPersistenceDTO,
} from '../dto/boleto.dto';
import { BoletoNotFoundError } from '../errors/boleto.errors';
import { BoletoModel } from '@/database/models/Boleto';

@injectable()
export class BoletoService {
  constructor(
    @inject('BoletoRepository')
    private readonly boletoRepository: IBoletoRepository
  ) {}

  async findAll(): Promise<BoletoModel[]> {
    return this.boletoRepository.findAll();
  }

  async findById(id: string): Promise<BoletoModel> {
    const boleto = await this.boletoRepository.findById(id);

    if (!boleto) {
      throw new BoletoNotFoundError(id);
    }

    return boleto;
  }

  async findByCompany(companyId: string): Promise<BoletoModel[]> {
    return this.boletoRepository.findByCompanyId(companyId);
  }

  async create(input: CreateBoletoInputDTO): Promise<BoletoModel> {
    const persistence: CreateBoletoPersistenceDTO = {
      company_id: input.company_id,
      cnpj_cliente: input.cnpj_cliente,
      empresa: input.empresa,
      telefone: input.telefone,
      contato: input.contato,
      nome_arquivo: input.nome_arquivo,
      num_lancamento: input.num_lancamento,
      vencimento: input.vencimento ? new Date(input.vencimento) : undefined,
      valor: input.valor,
      codigo_empresa: input.codigo_empresa,
      data_recebimento: input.data_recebimento ? new Date(input.data_recebimento) : undefined,
      active: input.active ?? true,
    };

    return this.boletoRepository.create(persistence);
  }

  async update(id: string, input: UpdateBoletoInputDTO): Promise<BoletoModel> {
    const boleto = await this.boletoRepository.findById(id);

    if (!boleto) {
      throw new BoletoNotFoundError(id);
    }

    const persistence: UpdateBoletoPersistenceDTO = {
      ...input,
      vencimento: input.vencimento ? new Date(input.vencimento) : undefined,
      data_recebimento: input.data_recebimento ? new Date(input.data_recebimento) : undefined,
    };

    const [, [updatedBoleto]] = await this.boletoRepository.update(id, persistence);

    return updatedBoleto;
  }

  async delete(id: string): Promise<void> {
    const boleto = await this.boletoRepository.findById(id);

    if (!boleto) {
      throw new BoletoNotFoundError(id);
    }

    await this.boletoRepository.delete(id);
  }

  async alterAtivo(id: string): Promise<void> {
    const boleto = await this.boletoRepository.findById(id);

    if (!boleto) {
      throw new BoletoNotFoundError(id);
    }

    const newStatus = !boleto.active;
    await this.boletoRepository.alterAtivo(id, newStatus);
  }
}
