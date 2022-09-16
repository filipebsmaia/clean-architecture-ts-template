import { Express, Router } from 'express';
import { resolve, parse } from 'path';
import { readdirSync } from 'fs';

const routesPath = resolve(__dirname, '..', 'routes');

export default async(app: Express): Promise<void> => {
  const dirs = readdirSync(routesPath);
  await Promise.all(dirs.map(async file => {
    if (!file.includes('.test.') && !file.includes('.spec.')) {
      const fileNameWithoutExt = parse(file).name;
      const routerPath = fileNameWithoutExt === 'public' ? '/' : fileNameWithoutExt;
      const router = Router();

      app.use(routerPath, router);
      (await import(resolve(routesPath, file))).default(router);
    }
  }));
};
