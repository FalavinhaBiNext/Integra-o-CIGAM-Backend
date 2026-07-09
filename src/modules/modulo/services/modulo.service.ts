import { inject, injectable } from 'tsyringe';
import { IModuloRepository } from '../interfaces/modulo.interface';
import {
  CreateModuloInputDTO,
  UpdateModuloInputDTO,
  CreateModuloPersistenceDTO,
  UpdateModuloPersistenceDTO,
} from '../dto/modulo.dto';
import { ModuloNotFoundError, ModuloNomeConflictError } from '../errors/modulo.errors';
import { ModuloModel } from '@/database/models/Modulo';

@injectable()
export class ModuloService {
  constructor(
    @inject('ModuloRepository')
    private readonly moduloRepository: IModuloRepository
  ) {}

  async findAll(): Promise<ModuloModel[]> {
    return this.moduloRepository.findAll();
  }

  async findById(id: string): Promise<ModuloModel> {
    const modulo = await this.moduloRepository.findById(id);

    if (!modulo) {
      throw new ModuloNotFoundError(id);
    }

    return modulo;
  }

  async create(input: CreateModuloInputDTO): Promise<ModuloModel> {
    const existingNome = await this.moduloRepository.findByNome(input.nome);

    if (existingNome) {
      throw new ModuloNomeConflictError(input.nome);
    }

    const persistence: CreateModuloPersistenceDTO = {
      nome: input.nome,
      descricao: input.descricao,
      icone: input.icone,
      active: input.active ?? true,
    };

    return this.moduloRepository.create(persistence);
  }

  async update(id: string, input: UpdateModuloInputDTO): Promise<ModuloModel> {
    const modulo = await this.moduloRepository.findById(id);

    if (!modulo) {
      throw new ModuloNotFoundError(id);
    }

    if (input.nome) {
      const existingNome = await this.moduloRepository.findByNome(input.nome);

      if (existingNome && existingNome.id !== id) {
        throw new ModuloNomeConflictError(input.nome);
      }
    }

    const persistence: UpdateModuloPersistenceDTO = { ...input };

    const [, [updatedModulo]] = await this.moduloRepository.update(id, persistence);

    return updatedModulo;
  }

  async delete(id: string): Promise<void> {
    const modulo = await this.moduloRepository.findById(id);

    if (!modulo) {
      throw new ModuloNotFoundError(id);
    }

    await this.moduloRepository.delete(id);
  }

  async alterAtivo(id: string): Promise<void> {
    const modulo = await this.moduloRepository.findById(id);

    if (!modulo) {
      throw new ModuloNotFoundError(id);
    }

    const newStatus = !modulo.active;
    await this.moduloRepository.alterAtivo(id, newStatus);
  }
}
