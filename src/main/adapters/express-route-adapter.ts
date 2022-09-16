import { Request, Response } from 'express';
import { HttpRequest, HttpResponse } from '@adapters/controllers/ports/Http';
import { ControllerAdapter } from '@adapters/controllers/ControllerAdapter';
import { serverError } from '@adapters/controllers/helpers/HttpHelper';

export const adaptRoute = (controller: ControllerAdapter) => {
  return async(req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      headers: req.headers,
      query: req.query,
      params: req.params
    };

    let httpResponse: HttpResponse;
    try {
      httpResponse = await controller.handle(httpRequest);
    } catch (err) {
      httpResponse = serverError('internal');
    }
    if (httpResponse.body) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
      return;
    }
    res.status(httpResponse.statusCode).send();
  };
};