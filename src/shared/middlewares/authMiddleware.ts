import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TokenPayload } from '@/modules/auth/dto/auth.dto';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-change-in-production';

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): Response | void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: { message: 'Token nao fornecido.' } });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(401).json({ error: { message: 'Formato de token invalido.' } });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: { message: 'Formato de token invalido.' } });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ error: { message: 'Token invalido ou expirado.' } });
  }
}
