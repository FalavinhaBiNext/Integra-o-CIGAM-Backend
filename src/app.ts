import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import openapiSchema from '@/shared/docs/openapi.json';
import { errorMiddleware } from '@/shared/middlewares/errorMiddleware';
import { globalRoutes } from '@/routes';

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSchema));
app.use('/api/v1', globalRoutes);

app.use(errorMiddleware);

export { app };
