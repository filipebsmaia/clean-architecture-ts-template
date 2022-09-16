import { Router } from 'express';
import { adaptRoute } from '../adapters/express-route-adapter';
import { makeRegisterUserController } from '../factories/makeCreateUserController';

export default (router: Router): void => {

  router.post('/user', adaptRoute(makeRegisterUserController()));
};