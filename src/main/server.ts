/* eslint-disable no-console */
import app from './config/app';

(async() => {
  const initializedApp = await app();

  initializedApp.listen(process.env.PORT || 3000, () => {
    console.log(`Server started at port ${process.env.PORT || 3000}`);
  });
}) ();