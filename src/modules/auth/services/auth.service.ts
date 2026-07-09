import { inject, injectable } from 'tsyringe';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUsuarioRepository } from '@/modules/usuario/interfaces/usuario.interface';
import { CompanyModel } from '@/database/models/Company';
import { LoginInputDTO, LoginResponseDTO, TokenPayload } from '../dto/auth.dto';
import { InvalidCredentialsError, InactiveCompanyError } from '../errors/auth.errors';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
const SALT_ROUNDS = 10;

@injectable()
export class LoginService {
  constructor(
    @inject('UsuarioRepository')
    private readonly usuarioRepository: IUsuarioRepository
  ) {}

  async execute(input: LoginInputDTO): Promise<LoginResponseDTO> {
    const usuario = await this.usuarioRepository.findByEmail(input.email);

    if (!usuario) {
      throw new InvalidCredentialsError();
    }

    if (!usuario.active) {
      throw new InvalidCredentialsError();
    }

    // Verify company active status
    const company = await CompanyModel.findByPk(usuario.company_id);
    if (!company || !company.getDataValue('active')) {
      throw new InactiveCompanyError();
    }

    const passwordMatch = await bcrypt.compare(input.senha, usuario.senha);

    if (!passwordMatch) {
      throw new InvalidCredentialsError();
    }

    const payload: TokenPayload = {
      userId: usuario.id,
      companyId: usuario.company_id,
      email: usuario.email,
      role: usuario.role,
    };

    const token = jwt.sign(payload as object, JWT_SECRET, { expiresIn: 86400 });

    return {
      token,
      user: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role,
        company_id: usuario.company_id,
      },
    };
  }
}

export class HashPasswordService {
  async execute(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }
}

export class VerifyTokenService {
  execute(token: string): TokenPayload {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
      return decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new InvalidCredentialsError();
      }
      throw new InvalidCredentialsError();
    }
  }
}
