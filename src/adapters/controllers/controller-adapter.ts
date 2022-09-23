import { HttpRequest, HttpResponse } from './ports/Http';

export interface ControllerAdapter {
  handle(request: HttpRequest): Promise<HttpResponse>;
}