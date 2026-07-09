import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/shared/errors/AppError';
import { logger } from '@/shared/utils/logger';

export function errorMiddleware(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      error: {
        message: error.message,
        details: error.details,
      },
    });
  }

  logger.error(error.message, error.stack);

  return res.status(500).json({
    error: {
      message: 'Erro interno do servidor.',
    },
  });
}
