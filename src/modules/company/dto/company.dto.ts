import { Request } from 'express';
import { CompanyModel } from '@/database/models/Company';

export type CreateCompanyInputDTO = {
  nome: string;
  cnpj: string;
  status?: string;
  active?: boolean;
};

export type UpdateCompanyInputDTO = {
  nome?: string;
  cnpj?: string;
  status?: string;
  active?: boolean;
};

export type CreateCompanyPersistenceDTO = {
  nome: string;
  cnpj: string;
  status: string;
  active: boolean;
};

export type UpdateCompanyPersistenceDTO = {
  nome?: string;
  cnpj?: string;
  status?: string;
  active?: boolean;
};

export class CreateCompanyDTO {
  static fromRequest(req: Request): CreateCompanyInputDTO {
    return {
      nome: String(req.body.nome || '').trim(),
      cnpj: String(req.body.cnpj || '').trim(),
      status: req.body.status ? String(req.body.status).trim() : undefined,
      active: req.body.active !== undefined ? Boolean(req.body.active) : undefined,
    };
  }
}

export class UpdateCompanyDTO {
  static fromRequest(req: Request): UpdateCompanyInputDTO {
    return {
      nome: req.body.nome ? String(req.body.nome).trim() : undefined,
      cnpj: req.body.cnpj ? String(req.body.cnpj).trim() : undefined,
      status: req.body.status ? String(req.body.status).trim() : undefined,
      active: req.body.active !== undefined ? Boolean(req.body.active) : undefined,
    };
  }
}

export class ResponseCompanyDTO {
  static fromEntity(company: CompanyModel) {
    return {
      id: company.id,
      nome: company.nome,
      cnpj: company.cnpj,
      status: company.status,
      active: company.active,
      created_at: company.created_at,
    };
  }
}
