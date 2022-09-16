/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpResponse {
  statusCode: number;
  body: any;
}

export interface HttpRequest<B = any, H = any, Q = any, P = any> {
  body: B;
  headers: H;
  query: Q;
  params: P;
}