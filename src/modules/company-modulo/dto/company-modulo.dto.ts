import { Request } from 'express';
import { CompanyModuloModel } from '@/database/models/CompanyModulo';

export type CreateCompanyModuloInputDTO = {
  company_id: string;
  modulo_id: string;
  active?: boolean;
};

export type UpdateCompanyModuloInputDTO = {
  company_id?: string;
  modulo_id?: string;
  active?: boolean;
};

export type CreateCompanyModuloPersistenceDTO = {
  company_id: string;
  modulo_id: string;
  active: boolean;
};

export type UpdateCompanyModuloPersistenceDTO = {
  company_id?: string;
  modulo_id?: string;
  active?: boolean;
};

export class CreateCompanyModuloDTO {
  static fromRequest(req: Request): CreateCompanyModuloInputDTO {
    return {
      company_id: String(req.body.company_id || '').trim(),
      modulo_id: String(req.body.modulo_id || '').trim(),
      active: req.body.active !== undefined ? Boolean(req.body.active) : undefined,
    };
  }
}

export class UpdateCompanyModuloDTO {
  static fromRequest(req: Request): UpdateCompanyModuloInputDTO {
    return {
      company_id: req.body.company_id ? String(req.body.company_id).trim() : undefined,
      modulo_id: req.body.modulo_id ? String(req.body.modulo_id).trim() : undefined,
      active: req.body.active !== undefined ? Boolean(req.body.active) : undefined,
    };
  }
}

export class CompanyModuloResponseDTO {
  static fromEntity(companyModulo: CompanyModuloModel) {
    return {
      id: companyModulo.id,
      company_id: companyModulo.company_id,
      modulo_id: companyModulo.modulo_id,
      active: companyModulo.active,
      created_at: companyModulo.created_at,
      updated_at: companyModulo.updated_at,
    };
  }
}
