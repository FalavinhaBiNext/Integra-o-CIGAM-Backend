import { RotaModel } from '@/database/models/Rota';

export interface CreateRotaInputDTO {
  nome: string;
  metodo: string;
  caminho: string;
  active?: boolean;
}

export interface UpdateRotaInputDTO {
  nome?: string;
  metodo?: string;
  caminho?: string;
  active?: boolean;
}

export class RotaResponseDTO {
  static fromEntity(entity: RotaModel) {
    return {
      id: entity.id,
      nome: entity.nome,
      metodo: entity.metodo,
      caminho: entity.caminho,
      active: entity.active,
    };
  }
}

export interface CreateModuloRotaInputDTO {
  modulo_id: string;
  rota_id: string;
}

export class ModuloRotaResponseDTO {
  static fromEntity(entity: any) {
    return {
      id: entity.id,
      modulo_id: entity.modulo_id,
      rota_id: entity.rota_id,
      active: entity.active,
      rota: entity.rota ? RotaResponseDTO.fromEntity(entity.rota) : undefined,
    };
  }
}
