import { Request } from 'express';
import { ModuloModel } from '@/database/models/Modulo';

export type CreateModuloInputDTO = {
  nome: string;
  descricao: string;
  icone: string;
  active?: boolean;
};

export type UpdateModuloInputDTO = {
  nome?: string;
  descricao?: string;
  icone?: string;
  active?: boolean;
};

export type CreateModuloPersistenceDTO = {
  nome: string;
  descricao: string;
  icone: string;
  active: boolean;
};

export type UpdateModuloPersistenceDTO = {
  nome?: string;
  descricao?: string;
  icone?: string;
  active?: boolean;
};

export class CreateModuloDTO {
  static fromRequest(req: Request): CreateModuloInputDTO {
    return {
      nome: String(req.body.nome || '').trim(),
      descricao: String(req.body.descricao || '').trim(),
      icone: String(req.body.icone || '').trim(),
      active: req.body.active !== undefined ? Boolean(req.body.active) : undefined,
    };
  }
}

export class UpdateModuloDTO {
  static fromRequest(req: Request): UpdateModuloInputDTO {
    return {
      nome: req.body.nome ? String(req.body.nome).trim() : undefined,
      descricao: req.body.descricao ? String(req.body.descricao).trim() : undefined,
      icone: req.body.icone ? String(req.body.icone).trim() : undefined,
      active: req.body.active !== undefined ? Boolean(req.body.active) : undefined,
    };
  }
}

export class ModuloResponseDTO {
  static fromEntity(modulo: ModuloModel) {
    return {
      id: modulo.id,
      nome: modulo.nome,
      descricao: modulo.descricao,
      icone: modulo.icone,
      active: modulo.active,
      created_at: modulo.created_at,
      updated_at: modulo.updated_at,
    };
  }
}
