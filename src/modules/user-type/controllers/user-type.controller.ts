import { inject, injectable } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { UserTypeService } from '../services/user-type.service';
import { CreateUserTypeDTO, UpdateUserTypeDTO, UserTypeResponseDTO } from '../dto/user-type.dto';
import { validateCreateUserType, validateUpdateUserType } from '../validators/user-type.validator';

@injectable()
export class UserTypeController {
  constructor(
    @inject('UserTypeService')
    private readonly userTypeService: UserTypeService
  ) {}

  async findAll(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userTypes = await this.userTypeService.findAll();
      return res.json(userTypes.map(UserTypeResponseDTO.fromEntity));
    } catch (error) {
      return next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userType = await this.userTypeService.findById(req.params.id);
      return res.json(UserTypeResponseDTO.fromEntity(userType));
    } catch (error) {
      return next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const input = CreateUserTypeDTO.fromRequest(req);
      const validated = validateCreateUserType(input);
      const userType = await this.userTypeService.create(validated);
      return res.status(201).json(UserTypeResponseDTO.fromEntity(userType));
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const input = UpdateUserTypeDTO.fromRequest(req);
      const validated = validateUpdateUserType(input);
      const userType = await this.userTypeService.update(req.params.id, validated);
      return res.json(UserTypeResponseDTO.fromEntity(userType));
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      await this.userTypeService.delete(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }
}
