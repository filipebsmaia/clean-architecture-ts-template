import { start } from './consumer' // eslint-disable-line

export default async(): Promise<void> => {
  await start();
};
