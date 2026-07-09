import { inject, injectable } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { CompanyIntegrationService } from '../services/company-integration.service';
import { CreateCompanyIntegrationDTO, UpdateCompanyIntegrationDTO, CompanyIntegrationResponseDTO } from '../dto/company-integration.dto';
import { validateCreateCompanyIntegration, validateUpdateCompanyIntegration } from '../validators/company-integration.validator';

@injectable()
export class CompanyIntegrationController {
  constructor(
    @inject('CompanyIntegrationService')
    private readonly companyIntegrationService: CompanyIntegrationService
  ) {}

  async findAll(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const integrations = await this.companyIntegrationService.findAll();
      return res.json(integrations.map(CompanyIntegrationResponseDTO.fromEntity));
    } catch (error) {
      return next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const integration = await this.companyIntegrationService.findById(req.params.id);
      return res.json(CompanyIntegrationResponseDTO.fromEntity(integration));
    } catch (error) {
      return next(error);
    }
  }

  async findByCompany(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const integration = await this.companyIntegrationService.findByCompany(req.params.companyId);
      if (!integration) {
        return res.status(404).json({ error: { message: 'Integracao nao encontrada para esta empresa.' } });
      }
      return res.json(CompanyIntegrationResponseDTO.fromEntity(integration));
    } catch (error) {
      return next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const input = CreateCompanyIntegrationDTO.fromRequest(req);
      const validated = validateCreateCompanyIntegration(input);
      const integration = await this.companyIntegrationService.create(validated);
      return res.status(201).json(CompanyIntegrationResponseDTO.fromEntity(integration));
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const input = UpdateCompanyIntegrationDTO.fromRequest(req);
      const validated = validateUpdateCompanyIntegration(input);
      const integration = await this.companyIntegrationService.update(req.params.id, validated);
      return res.json(CompanyIntegrationResponseDTO.fromEntity(integration));
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      await this.companyIntegrationService.delete(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }

  async alterAtivo(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      await this.companyIntegrationService.alterAtivo(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }
}
