import { inject, injectable } from 'tsyringe';
import { ICompanyRepository } from '../interfaces/company.interface';
import { ConflictError, NotFoundError } from '@/shared/errors/AppError';
import { CreateCompanyInputDTO, ResponseCompanyDTO, UpdateCompanyInputDTO, CreateCompanyPersistenceDTO, UpdateCompanyPersistenceDTO } from '../dto/company.dto';
import { logger } from '@/shared/utils/logger';


@injectable()
export class CompanyService {
  constructor(
    @inject('CompanyRepository')
    private readonly companyRepository: ICompanyRepository
  ) {}

  async create(data: CreateCompanyInputDTO): Promise<ResponseCompanyDTO> {
    logger.info('Iniciando criação da Company...')
    logger.debug('Verificando se existe Company com CNPJ')
    const companyExistence = await this.companyRepository.findByCnpj(data.cnpj)
    if(companyExistence){
      logger.error('Company com CNPJ já cadastrado')
      throw new ConflictError('Company com CNPJ já cadastrado')
    }
    logger.success('Company não encontrada com CNPJ informado, prosseguindo para criação')
    const persistence: CreateCompanyPersistenceDTO = {
      nome: data.nome,
      cnpj: data.cnpj,
      status: data.status ?? 'ativo',
      active: data.active ?? true,
    };
    const companyCreated = await this.companyRepository.create(persistence)
    logger.success('Company Criada com sucesso')
    return ResponseCompanyDTO.fromEntity(companyCreated)
  }

  async findAll(): Promise<ResponseCompanyDTO[]>{
    logger.info('Buscando todas as Companies...')
    const companies = await this.companyRepository.findAll();
    if(companies.length === 0){
      logger.info(`Total de ${companies.length} Companies encontradas no sistema`)
      return []
    }
    logger.success(`Total de ${companies.length} Companies encontradas no sistema`)
    return companies.map(ResponseCompanyDTO.fromEntity)
  }

  async findById(id: string): Promise<ResponseCompanyDTO | null> {
    logger.info(`Iniciando a busca da company com o ID: ${id}`)
    const company = await this.companyRepository.findById(id)
    if(!company){
      logger.warn(`Company com o ID: ${id} não encontrada no sistema`)
      return null
    }
    logger.success('Empresa encontrada com sucesso')
    return ResponseCompanyDTO.fromEntity(company)
  }

  async findByCnpj(cnpj: string): Promise<ResponseCompanyDTO | null>{
    logger.info(`Iniciando a busca da Company com o CNPJ: ${cnpj}`)
    const company = await this.companyRepository.findByCnpj(cnpj)
    if(!company){
      logger.warn(`Company com o CNPJ informado não encontrado no sistema`)
      return null
    }

    logger.success('Empresa encontrada com sucesso')
    return ResponseCompanyDTO.fromEntity(company)
  }

  async update(data: UpdateCompanyInputDTO, id: string): Promise<void>{
    logger.info(`Iniciando a atualização da company com o ID: ${id}`)
    logger.warn('Verificando se a Company existe no banco de dados')
    const companyExist = await this.companyRepository.findById(id)
    if(!companyExist){
      logger.error(`Company não encontrada no sistema`)
      throw new NotFoundError(`Company com o ID: ${id} não encontrada no sistema`)
    }
    logger.success('Company encontrada...')
    logger.info('Atualizando a Company')
    const persistence: UpdateCompanyPersistenceDTO = { ...data };
    await this.companyRepository.update(id, persistence);
    logger.success('Company atualizada com sucesso')
    return
  }

  async delete(id: string): Promise<void>{
    logger.info(`Iniciando a exclusão da Company com o ID: ${id}`)
    logger.warn('Verificando se a Company existe no banco de dados')
    const companyExist = await this.companyRepository.findById(id)
    if(!companyExist){
      logger.error('Company não encontrada no sistema')
      throw new NotFoundError(`Company com o ID ${id} não encontrada no sistema`)
    }
    logger.success('Company encontrada...')
    logger.info('Deletando a Company do sistema')
    await this.companyRepository.delete(id);
    logger.success('Company deletada com sucesso')
    return
  }

  async alterAtivo(id: string): Promise<void>{
    logger.info(`Iniciando alteração do status Ativo da Company com ID: ${id}`)
    logger.warn(`Verificando se a Company com ID: ${id} existe no banco de dados`)
    const companyExist = await this.companyRepository.findById(id);
    if(!companyExist){
      logger.error('Company não encontrada no sistema')
      throw new NotFoundError(`Company com o ID ${id} não encontrada no sistema`)
    }
    logger.success('Company encontrada')
    logger.info('Alterando o status Ativo da Company no sistema')
    const newStatus = !companyExist.active
    await this.companyRepository.alterAtivo(id, newStatus)
    logger.success(`Status da Company ${id} alterada para ${newStatus} com sucesso`)
    return
  }
}