import { Request } from 'express';
import { UsuarioModel, UsuarioRole } from '@/database/models/Usuario';

export type CreateUsuarioInputDTO = {
  company_id: string;
  nome: string;
  email: string;
  senha: string;
  role?: UsuarioRole;
  active?: boolean;
};

export type UpdateUsuarioInputDTO = {
  company_id?: string;
  nome?: string;
  email?: string;
  senha?: string;
  role?: UsuarioRole;
  active?: boolean;
};

export type CreateUsuarioPersistenceDTO = {
  company_id: string;
  nome: string;
  email: string;
  senha: string;
  role: UsuarioRole;
  active: boolean;
};

export type UpdateUsuarioPersistenceDTO = {
  company_id?: string;
  nome?: string;
  email?: string;
  senha?: string;
  role?: UsuarioRole;
  active?: boolean;
};

export class CreateUsuarioDTO {
  static fromRequest(req: Request): CreateUsuarioInputDTO {
    return {
      company_id: String(req.body.company_id || '').trim(),
      nome: String(req.body.nome || '').trim(),
      email: String(req.body.email || '').trim().toLowerCase(),
      senha: String(req.body.senha || ''),
      role: req.body.role ? (String(req.body.role).trim().toUpperCase() as UsuarioRole) : undefined,
      active: req.body.active !== undefined ? Boolean(req.body.active) : undefined,
    };
  }
}

export class UpdateUsuarioDTO {
  static fromRequest(req: Request): UpdateUsuarioInputDTO {
    return {
      company_id: req.body.company_id ? String(req.body.company_id).trim() : undefined,
      nome: req.body.nome ? String(req.body.nome).trim() : undefined,
      email: req.body.email ? String(req.body.email).trim().toLowerCase() : undefined,
      senha: req.body.senha ? String(req.body.senha) : undefined,
      role: req.body.role ? (String(req.body.role).trim().toUpperCase() as UsuarioRole) : undefined,
      active: req.body.active !== undefined ? Boolean(req.body.active) : undefined,
    };
  }
}

export class UsuarioResponseDTO {
  static fromEntity(usuario: UsuarioModel) {
    return {
      id: usuario.id,
      company_id: usuario.company_id,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role,
      active: usuario.active,
      created_at: usuario.created_at,
      updated_at: usuario.updated_at,
    };
  }
}
