import { Request, Response, NextFunction } from 'express';
import { RotaModel } from '@/database/models/Rota';
import { ModuloRotaModel } from '@/database/models/ModuloRota';
import { CompanyModuloModel } from '@/database/models/CompanyModulo';

export async function moduleGuard(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    // 1. Skip check if user is not authenticated yet or is a SUPERADMIN
    if (!req.user) {
      return next();
    }

    if (req.user.role === 'SUPERADMIN') {
      return next();
    }

    const companyId = req.user.companyId;
    const method = req.method;
    
    // Normalize path by removing trailing slashes
    const fullPath = (req.baseUrl + req.path).replace(/\/$/, '') || '/';

    // 2. Fetch all active routes in database
    const dbRoutes = await RotaModel.findAll({ where: { active: true } });

    // 3. Find if the requested URL matches any registered route pattern (supporting params like :id)
    const matchedRoute = dbRoutes.find(r => {
      if (r.metodo.toUpperCase() !== method.toUpperCase()) return false;

      const routePathClean = r.caminho.replace(/\/$/, '') || '/';
      
      // Convert express-style route ":param" to regex "[^/]+"
      const pathRegexString = '^' + routePathClean
        .replace(/:[a-zA-Z0-9_]+/g, '[^/]+')
        .replace(/\//g, '\\/') + '$';

      const pathRegex = new RegExp(pathRegexString);
      return pathRegex.test(fullPath);
    });

    // 4. If the route is not registered/protected, allow it
    if (!matchedRoute) {
      return next();
    }

    // 5. Find modules associated with this matched route
    const associations = await ModuloRotaModel.findAll({
      where: { rota_id: matchedRoute.id, active: true }
    });

    // If route is registered but has no module links, allow it
    if (associations.length === 0) {
      return next();
    }

    // 6. Verify if the company has at least one of these modules active
    const activeCompanyModules = await CompanyModuloModel.findAll({
      where: {
        company_id: companyId,
        modulo_id: associations.map(a => a.modulo_id),
        active: true
      }
    });

    if (activeCompanyModules.length === 0) {
      return res.status(403).json({
        error: {
          message: 'Acesso negado. Esta funcionalidade exige a contratacao do modulo correspondente.'
        }
      });
    }

    return next();
  } catch (error) {
    return next(error);
  }
}
