/* eslint-disable no-console */
import { config } from 'dotenv-flow';

config({ silent: true });

import httpApp from './config/http/app';
import messagingApp from './config/messaging/app';
//
(async() => {
  httpApp().then(express => {
    express.listen(process.env.PORT || 3000, () => {
      console.log(`Http server started at port ${process.env.PORT || 3000}`);
    });
  });
  messagingApp().then(() => {
    console.log('Kafka consumer running!');
  });

}) ();