import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';
import { randomBytes } from 'crypto';

const TEMP_DIR = path.resolve(__dirname, '..', '..', 'uploads', 'temp');

const storage = multer.diskStorage({
  destination: (_req: Request, _file: Express.Multer.File, cb) => {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
    cb(null, TEMP_DIR);
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