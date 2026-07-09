import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';
import { randomBytes } from 'crypto';
import { CompanyModel } from '@/database/models/Company';

const UPLOADS_DIR = path.resolve(__dirname, '..', '..', 'uploads', 'pdfs');

async function getFolderName(companyId: string): Promise<string> {
  try {
    const company = await CompanyModel.findByPk(companyId);
    if (company) {
      return `${company.nome} (${companyId})`;
    }
  } catch {}
  return companyId;
}

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    const companyId = req.body.company_id || req.params.companyId || 'default';

    getFolderName(companyId).then((folderName) => {
      const dir = path.join(UPLOADS_DIR, folderName);

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      cb(null, dir);
    }).catch(() => {
      const dir = path.join(UPLOADS_DIR, companyId);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
    });
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const timestamp = Date.now();
    const random = randomBytes(2).toString('hex');
    const ext = path.extname(file.originalname);
    cb(null, `${timestamp}_${random}${ext}`);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Apenas arquivos PDF são permitidos.'));
  }
};

export const uploadBoleto = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});
