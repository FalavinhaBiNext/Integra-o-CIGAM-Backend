import { Request } from 'express';
import { CompanyIntegrationModel, StatusConexao } from '@/database/models/CompanyIntegration';

export type CreateCompanyIntegrationInputDTO = {
  company_id: string;
  empresa: string;
  login: string;
  senha: string;
  url_portal: string;
  token: string;
  status_conexao?: StatusConexao;
  active?: boolean;
};

export type UpdateCompanyIntegrationInputDTO = {
  company_id?: string;
  empresa?: string;
  login?: string;
  senha?: string;
  url_portal?: string;
  token?: string;
  status_conexao?: StatusConexao;
  active?: boolean;
};

export type CreateCompanyIntegrationPersistenceDTO = {
  company_id: string;
  empresa: string;
  login: string;
  senha: string;
  url_portal: string;
  token: string;
  status_conexao: StatusConexao;
  active: boolean;
};

export type UpdateCompanyIntegrationPersistenceDTO = {
  company_id?: string;
  empresa?: string;
  login?: string;
  senha?: string;
  url_portal?: string;
  token?: string;
  status_conexao?: StatusConexao;
  active?: boolean;
};

export class CreateCompanyIntegrationDTO {
  static fromRequest(req: Request): CreateCompanyIntegrationInputDTO {
    return {
      company_id: String(req.body.company_id || '').trim(),
      empresa: String(req.body.empresa || '').trim(),
      login: String(req.body.login || '').trim(),
      senha: String(req.body.senha || ''),
      url_portal: String(req.body.url_portal || '').trim(),
      token: String(req.body.token || ''),
      status_conexao: req.body.status_conexao ? (String(req.body.status_conexao).trim() as StatusConexao) : undefined,
      active: req.body.active !== undefined ? Boolean(req.body.active) : undefined,
    };
  }
}

export class UpdateCompanyIntegrationDTO {
  static fromRequest(req: Request): UpdateCompanyIntegrationInputDTO {
    return {
      company_id: req.body.company_id ? String(req.body.company_id).trim() : undefined,
      empresa: req.body.empresa ? String(req.body.empresa).trim() : undefined,
      login: req.body.login ? String(req.body.login).trim() : undefined,
      senha: req.body.senha ? String(req.body.senha) : undefined,
      url_portal: req.body.url_portal ? String(req.body.url_portal).trim() : undefined,
      token: req.body.token ? String(req.body.token) : undefined,
      status_conexao: req.body.status_conexao ? (String(req.body.status_conexao).trim() as StatusConexao) : undefined,
      active: req.body.active !== undefined ? Boolean(req.body.active) : undefined,
    };
  }
}

export class CompanyIntegrationResponseDTO {
  static fromEntity(integration: CompanyIntegrationModel) {
    return {
      id: integration.id,
      company_id: integration.company_id,
      empresa: integration.empresa,
      login: integration.login,
      url_portal: integration.url_portal,
      status_conexao: integration.status_conexao,
      active: integration.active,
      created_at: integration.created_at,
      updated_at: integration.updated_at,
    };
  }
}
