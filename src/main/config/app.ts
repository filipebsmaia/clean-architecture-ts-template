import express, { Express } from 'express';
import setupMiddleware from './middleware';
import setupRoutes from './routes';

const app = express();
setupMiddleware(app);
setupRoutes(app);

// export default app;

export default async(): Promise<Express> => {
  const app = express();
  setupMiddleware(app);
  await setupRoutes(app);

  return app;
};
