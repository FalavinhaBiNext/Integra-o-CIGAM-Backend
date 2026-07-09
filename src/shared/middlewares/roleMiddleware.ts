import { Request, Response, NextFunction } from 'express';

export function roleMiddleware(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction): Response | void => {
    if (!req.user) {
      return res.status(401).json({ error: { message: 'Nao autenticado.' } });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: { message: 'Acesso negado. Voce nao possui permissao para acessar este recurso.' } 
      });
    }

    return next();
  };
}
