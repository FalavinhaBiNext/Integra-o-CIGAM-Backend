import { inject, injectable } from 'tsyringe';
import { IUsuarioRepository } from '../interfaces/usuario.interface';
import {
  CreateUsuarioInputDTO,
  UpdateUsuarioInputDTO,
  CreateUsuarioPersistenceDTO,
  UpdateUsuarioPersistenceDTO,
} from '../dto/usuario.dto';
import { UsuarioNotFoundError, UsuarioEmailConflictError } from '../errors/usuario.errors';
import { UsuarioModel } from '@/database/models/Usuario';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

@injectable()
export class UsuarioService {
  constructor(
    @inject('UsuarioRepository')
    private readonly usuarioRepository: IUsuarioRepository
  ) {}

  async findAll(): Promise<UsuarioModel[]> {
    return this.usuarioRepository.findAll();
  }

  async findById(id: string): Promise<UsuarioModel> {
    const usuario = await this.usuarioRepository.findById(id);

    if (!usuario) {
      throw new UsuarioNotFoundError(id);
    }

    return usuario;
  }

  async findByCompany(companyId: string): Promise<UsuarioModel[]> {
    return this.usuarioRepository.findByCompanyId(companyId);
  }

  async create(input: CreateUsuarioInputDTO): Promise<UsuarioModel> {
    const existingEmail = await this.usuarioRepository.findByEmail(input.email);

    if (existingEmail) {
      throw new UsuarioEmailConflictError(input.email);
    }

    const hashedPassword = await bcrypt.hash(input.senha, SALT_ROUNDS);

    const persistence: CreateUsuarioPersistenceDTO = {
      company_id: input.company_id,
      nome: input.nome,
      email: input.email,
      senha: hashedPassword,
      role: input.role ?? 'USER',
      active: input.active ?? true,
    };

    return this.usuarioRepository.create(persistence);
  }

  async update(id: string, input: UpdateUsuarioInputDTO): Promise<UsuarioModel> {
    const usuario = await this.usuarioRepository.findById(id);

    if (!usuario) {
      throw new UsuarioNotFoundError(id);
    }

    if (input.email) {
      const existingEmail = await this.usuarioRepository.findByEmail(input.email);

      if (existingEmail && existingEmail.id !== id) {
        throw new UsuarioEmailConflictError(input.email);
      }
    }

    const persistence: UpdateUsuarioPersistenceDTO = { ...input };

    if (input.senha) {
      persistence.senha = await bcrypt.hash(input.senha, SALT_ROUNDS);
    }

    const [, [updatedUsuario]] = await this.usuarioRepository.update(id, persistence);

    return updatedUsuario;
  }

  async delete(id: string): Promise<void> {
    const usuario = await this.usuarioRepository.findById(id);

    if (!usuario) {
      throw new UsuarioNotFoundError(id);
    }

    await this.usuarioRepository.delete(id);
  }

  async alterAtivo(id: string): Promise<void> {
    const usuario = await this.usuarioRepository.findById(id);

    if (!usuario) {
      throw new UsuarioNotFoundError(id);
    }

    const newStatus = !usuario.active;
    await this.usuarioRepository.alterAtivo(id, newStatus);
  }
}
