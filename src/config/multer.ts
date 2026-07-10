import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';
import { randomBytes } from 'crypto';
import { CompanyModel } from '@/database/models/Company';

const UPLOADS_DIR = path.resolve(__dirname, '..', '..', 'uploads', 'pdfs');

type AuthenticatedRequest = Request & {
  user?: {
    companyId?: string;
    role?: string;
  };
};

async function getFolderName(companyId: string): Promise<string> {
  const company = await CompanyModel.findByPk(companyId);

  if (!company) {
    throw new Error(`Empresa com ID "${companyId}" não encontrada.`);
  }

  const safeCompanyName = company.nome
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, '')
    .trim();

  return `${safeCompanyName} (${companyId})`;
}

const storage = multer.diskStorage({
  destination: async (
    req: AuthenticatedRequest,
    file: Express.Multer.File,
    cb
  ) => {
    try {
      const companyId =
        req.params.companyId ||
        req.user?.companyId ||
        req.body?.company_id;

      if (!companyId) {
        return cb(
          new Error('Empresa não identificada para o upload do boleto.'),
          ''
        );
      }

      const folderName = await getFolderName(companyId);
      const dir = path.join(UPLOADS_DIR, folderName);

      fs.mkdirSync(dir, { recursive: true });

      return cb(null, dir);
    } catch (error) {
      const message =
        error instanceof Error
          ? error
          : new Error('Erro ao definir a pasta de upload.');

      return cb(message, '');
    }
  },

  filename: (
    req: Request,
    file: Express.Multer.File,
    cb
  ) => {
    const timestamp = Date.now();
    const random = randomBytes(2).toString('hex');
    const ext = path.extname(file.originalname).toLowerCase();

    cb(null, `${timestamp}_${random}${ext}`);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype !== 'application/pdf') {
    return cb(new Error('Apenas arquivos PDF são permitidos.'));
  }

  return cb(null, true);
};

export const uploadBoleto = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});