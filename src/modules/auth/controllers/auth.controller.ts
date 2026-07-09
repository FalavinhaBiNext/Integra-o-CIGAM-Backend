import { inject, injectable } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { LoginService } from '../services/auth.service';
import { LoginDTO } from '../dto/auth.dto';
import { validateLogin } from '../validators/auth.validator';

@injectable()
export class LoginController {
  constructor(
    @inject('LoginService')
    private readonly loginService: LoginService
  ) {}

  async handle(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const input = LoginDTO.fromRequest(req);
      const validated = validateLogin(input);
      const result = await this.loginService.execute(validated);
      return res.json(result);
    } catch (error) {
      return next(error);
    }
  }
}
