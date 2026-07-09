import { inject, injectable } from 'tsyringe';
import { IUserTypeRepository } from '../interfaces/user-type.interface';
import { CreateUserTypeInputDTO, UpdateUserTypeInputDTO, CreateUserTypePersistenceDTO, UpdateUserTypePersistenceDTO } from '../dto/user-type.dto';
import { UserTypeNotFoundError, UserTypeTipoConflictError } from '../errors/user-type.errors';
import { UserTypeModel } from '@/database/models/UserType';

@injectable()
export class UserTypeService {
  constructor(
    @inject('UserTypeRepository')
    private readonly userTypeRepository: IUserTypeRepository
  ) {}

  async findAll(): Promise<UserTypeModel[]> {
    return this.userTypeRepository.findAll();
  }

  async findById(id: string): Promise<UserTypeModel> {
    const userType = await this.userTypeRepository.findById(id);

    if (!userType) {
      throw new UserTypeNotFoundError(id);
    }

    return userType;
  }

  async create(input: CreateUserTypeInputDTO): Promise<UserTypeModel> {
    const existingTipo = await this.userTypeRepository.findByTipo(input.tipo);

    if (existingTipo) {
      throw new UserTypeTipoConflictError(input.tipo);
    }

    const persistence: CreateUserTypePersistenceDTO = {
      tipo: input.tipo,
      active: input.active ?? true,
    };

    return this.userTypeRepository.create(persistence);
  }

  async update(id: string, input: UpdateUserTypeInputDTO): Promise<UserTypeModel> {
    const userType = await this.userTypeRepository.findById(id);

    if (!userType) {
      throw new UserTypeNotFoundError(id);
    }

    if (input.tipo) {
      const existingTipo = await this.userTypeRepository.findByTipo(input.tipo);

      if (existingTipo && existingTipo.id !== id) {
        throw new UserTypeTipoConflictError(input.tipo);
      }
    }

    const persistence: UpdateUserTypePersistenceDTO = { ...input };

    const [, [updatedUserType]] = await this.userTypeRepository.update(id, persistence);

    return updatedUserType;
  }

  async delete(id: string): Promise<void> {
    const userType = await this.userTypeRepository.findById(id);

    if (!userType) {
      throw new UserTypeNotFoundError(id);
    }

    await this.userTypeRepository.delete(id);
  }
}
