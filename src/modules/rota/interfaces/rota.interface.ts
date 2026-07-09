import { RotaModel } from '@/database/models/Rota';
import { ModuloRotaModel } from '@/database/models/ModuloRota';

export interface IRotaRepository {
  create(data: { nome: string; metodo: string; caminho: string; active?: boolean }): Promise<RotaModel>;
  findAll(): Promise<RotaModel[]>;
  findById(id: string): Promise<RotaModel | null>;
  findByMethodAndPath(metodo: string, caminho: string): Promise<RotaModel | null>;
  update(id: string, data: { nome?: string; metodo?: string; caminho?: string; active?: boolean }): Promise<void>;
  delete(id: string): Promise<void>;
  alterAtivo(id: string, active: boolean): Promise<void>;
}

export interface IModuloRotaRepository {
  create(data: { modulo_id: string; rota_id: string; active?: boolean }): Promise<ModuloRotaModel>;
  findAll(): Promise<ModuloRotaModel[]>;
  findById(id: string): Promise<ModuloRotaModel | null>;
  findByModuloId(moduloId: string): Promise<ModuloRotaModel[]>;
  findAssociation(moduloId: string, rotaId: string): Promise<ModuloRotaModel | null>;
  delete(id: string): Promise<void>;
}
