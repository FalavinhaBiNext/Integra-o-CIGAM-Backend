import { Request } from 'express';

export type LoginInputDTO = {
  email: string;
  senha: string;
};

export class LoginDTO {
  static fromRequest(req: Request): LoginInputDTO {
    return {
      email: String(req.body.email || '').trim().toLowerCase(),
      senha: String(req.body.senha || ''),
    };
  }
}

export type TokenPayload = {
  userId: string;
  companyId: string;
  email: string;
  role: string;
};

export type LoginResponseDTO = {
  token: string;
  user: {
    id: string;
    nome: string;
    email: string;
    role: string;
    company_id: string;
  };
};
