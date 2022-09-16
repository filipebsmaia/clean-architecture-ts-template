import { Express, json, NextFunction, Request, Response } from 'express';

const bodyParser = json();

const cors = (_req: Request, res: Response, next: NextFunction): void => {
  res.set('access-control-allow-origin', '*');
  res.set('access-control-allow-headers', '*');
  res.set('access-control-allow-methods', '*');

  next();
};

export default (app: Express): void => {
  app.use(bodyParser);
  app.use(cors);
};
