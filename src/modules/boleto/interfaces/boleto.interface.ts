import { BoletoModel } from '@/database/models/Boleto';
import { CreateBoletoPersistenceDTO, UpdateBoletoPersistenceDTO } from '../dto/boleto.dto';

export interface IBoletoRepository {
  findAll(): Promise<BoletoModel[]>;
  findById(id: string): Promise<BoletoModel | null>;
  findByCompanyId(companyId: string): Promise<BoletoModel[]>;
  create(data: CreateBoletoPersistenceDTO): Promise<BoletoModel>;
  update(id: string, data: UpdateBoletoPersistenceDTO): Promise<[number, BoletoModel[]]>;
  delete(id: string): Promise<number>;
  alterAtivo(id: string, ativo: boolean): Promise<void>;
}
