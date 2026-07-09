import { Request } from 'express';
import { BoletoModel } from '@/database/models/Boleto';

export type CreateBoletoInputDTO = {
  company_id: string;
  cnpj_cliente: string;
  empresa: string;
  telefone: string;
  contato: string;
  nome_arquivo: string;
  num_lancamento: string;
  vencimento?: string;
  valor?: string;
  codigo_empresa?: string;
  data_recebimento?: string;
  active?: boolean;
};

export type UpdateBoletoInputDTO = {
  cnpj_cliente?: string;
  empresa?: string;
  telefone?: string;
  contato?: string;
  num_lancamento?: string;
  vencimento?: string;
  valor?: string;
  codigo_empresa?: string;
  data_recebimento?: string;
  active?: boolean;
};

export type CreateBoletoPersistenceDTO = {
  company_id: string;
  cnpj_cliente: string;
  empresa: string;
  telefone: string;
  contato: string;
  nome_arquivo: string;
  num_lancamento: string;
  vencimento?: Date;
  valor?: string;
  codigo_empresa?: string;
  data_recebimento?: Date;
  active: boolean;
};

export type UpdateBoletoPersistenceDTO = {
  cnpj_cliente?: string;
  empresa?: string;
  telefone?: string;
  contato?: string;
  num_lancamento?: string;
  vencimento?: Date;
  valor?: string;
  codigo_empresa?: string;
  data_recebimento?: Date;
  active?: boolean;
};

export class CreateBoletoDTO {
  static fromRequest(req: Request, nomeArquivo: string): CreateBoletoInputDTO {
    return {
      company_id: String(req.body.company_id || '').trim(),
      cnpj_cliente: String(req.body.cnpj_cliente || '').trim(),
      empresa: String(req.body.empresa || '').trim(),
      telefone: String(req.body.telefone || '').trim(),
      contato: String(req.body.contato || '').trim(),
      nome_arquivo: nomeArquivo,
      num_lancamento: String(req.body.num_lancamento || '').trim(),
      vencimento: req.body.vencimento ? String(req.body.vencimento).trim() : undefined,
      valor: req.body.valor ? String(req.body.valor).trim() : undefined,
      codigo_empresa: req.body.codigo_empresa ? String(req.body.codigo_empresa).trim() : undefined,
      data_recebimento: req.body.data_recebimento ? String(req.body.data_recebimento).trim() : undefined,
      active: req.body.active !== undefined ? Boolean(req.body.active) : undefined,
    };
  }
}

export class UpdateBoletoDTO {
  static fromRequest(req: Request): UpdateBoletoInputDTO {
    return {
      cnpj_cliente: req.body.cnpj_cliente ? String(req.body.cnpj_cliente).trim() : undefined,
      empresa: req.body.empresa ? String(req.body.empresa).trim() : undefined,
      telefone: req.body.telefone ? String(req.body.telefone).trim() : undefined,
      contato: req.body.contato ? String(req.body.contato).trim() : undefined,
      num_lancamento: req.body.num_lancamento ? String(req.body.num_lancamento).trim() : undefined,
      vencimento: req.body.vencimento ? String(req.body.vencimento).trim() : undefined,
      valor: req.body.valor ? String(req.body.valor).trim() : undefined,
      codigo_empresa: req.body.codigo_empresa ? String(req.body.codigo_empresa).trim() : undefined,
      data_recebimento: req.body.data_recebimento ? String(req.body.data_recebimento).trim() : undefined,
      active: req.body.active !== undefined ? Boolean(req.body.active) : undefined,
    };
  }
}

export class BoletoResponseDTO {
  static fromEntity(boleto: BoletoModel) {
    return {
      id: boleto.id,
      company_id: boleto.company_id,
      cnpj_cliente: boleto.cnpj_cliente,
      empresa: boleto.empresa,
      telefone: boleto.telefone,
      contato: boleto.contato,
      nome_arquivo: boleto.nome_arquivo,
      num_lancamento: boleto.num_lancamento,
      vencimento: boleto.vencimento,
      valor: boleto.valor,
      codigo_empresa: boleto.codigo_empresa,
      data_recebimento: boleto.data_recebimento,
      active: boleto.active,
      created_at: boleto.created_at,
      updated_at: boleto.updated_at,
    };
  }
}
