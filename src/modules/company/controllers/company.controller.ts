import { inject, injectable } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { CompanyService } from '../services/company.service';
import { validateCreateCompany, validateUpdateCompany } from '../validators/company.validator';

@injectable()
export class CompanyController {
  constructor(
    @inject('CompanyService')
    private readonly companyService: CompanyService
  ) {}

  health = async (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      status: 'ok',
      service: 'Company Services',
      message: 'Rota Company Rodando',
      timestamp: new Date().toISOString()
    });
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = validateCreateCompany(req.body);
      const company = await this.companyService.create(validated);
      return res.status(201).json(company);
    } catch (error) {
      return next(error);
    }
  };

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const companies = await this.companyService.findAll();
      return res.status(200).json(companies);
    } catch (error) {
      return next(error);
    }
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const company = await this.companyService.findById(id);
      return res.status(200).json(company);
    } catch (error) {
      return next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const validated = validateUpdateCompany(req.body);
      await this.companyService.update(validated, id);
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.companyService.delete(id);
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  };

  alterAtivo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.companyService.alterAtivo(id);
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  };
}
