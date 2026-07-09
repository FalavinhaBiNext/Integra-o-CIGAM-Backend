import { Request } from 'express';
import { UserTypeModel } from '@/database/models/UserType';

export type CreateUserTypeInputDTO = {
  tipo: string;
  active?: boolean;
};

export type UpdateUserTypeInputDTO = {
  tipo?: string;
  active?: boolean;
};

export type CreateUserTypePersistenceDTO = {
  tipo: string;
  active: boolean;
};

export type UpdateUserTypePersistenceDTO = {
  tipo?: string;
  active?: boolean;
};

export class CreateUserTypeDTO {
  static fromRequest(req: Request): CreateUserTypeInputDTO {
    return {
      tipo: String(req.body.tipo || '').trim().toUpperCase(),
      active: req.body.active !== undefined ? Boolean(req.body.active) : undefined,
    };
  }
}

export class UpdateUserTypeDTO {
  static fromRequest(req: Request): UpdateUserTypeInputDTO {
    return {
      tipo: req.body.tipo ? String(req.body.tipo).trim().toUpperCase() : undefined,
      active: req.body.active !== undefined ? Boolean(req.body.active) : undefined,
    };
  }
}

export class UserTypeResponseDTO {
  static fromEntity(userType: UserTypeModel) {
    return {
      id: userType.id,
      tipo: userType.tipo,
      active: userType.active,
      created_at: userType.created_at,
      updated_at: userType.updated_at,
    };
  }
}
