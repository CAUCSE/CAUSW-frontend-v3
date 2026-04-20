import {
  http,
  type HttpHandler,
  type HttpResponseResolver,
  type PathParams,
  type DefaultBodyType,
} from 'msw';

import { BASE_URL } from '@/shared/config';
import { type DefaultResponseField } from '@/shared/types';

type MswResolver<
  ResponseType,
  RequestBodyType extends DefaultBodyType,
  Params extends PathParams<keyof Params> = PathParams,
> = HttpResponseResolver<
  Params,
  RequestBodyType,
  DefaultResponseField<ResponseType>
>;

export const mswHttp = {
  get: <
    ResponseType,
    Params extends PathParams<keyof Params> = PathParams,
    RequestBodyType extends DefaultBodyType = DefaultBodyType,
  >(
    url: string,
    resolver: MswResolver<ResponseType, RequestBodyType, Params>,
  ): HttpHandler => http.get(`${BASE_URL}${url}`, resolver),
  post: <
    ResponseType,
    Params extends PathParams<keyof Params> = PathParams,
    RequestBodyType extends DefaultBodyType = DefaultBodyType,
  >(
    url: string,
    resolver: MswResolver<ResponseType, RequestBodyType, Params>,
  ): HttpHandler => http.post(`${BASE_URL}${url}`, resolver),
  put: <
    ResponseType,
    Params extends PathParams<keyof Params> = PathParams,
    RequestBodyType extends DefaultBodyType = DefaultBodyType,
  >(
    url: string,
    resolver: MswResolver<ResponseType, RequestBodyType, Params>,
  ): HttpHandler => http.put(`${BASE_URL}${url}`, resolver),
  delete: <
    ResponseType,
    Params extends PathParams<keyof Params> = PathParams,
    RequestBodyType extends DefaultBodyType = DefaultBodyType,
  >(
    url: string,
    resolver: MswResolver<ResponseType, RequestBodyType, Params>,
  ): HttpHandler => http.delete(`${BASE_URL}${url}`, resolver),
  patch: <
    ResponseType,
    Params extends PathParams<keyof Params> = PathParams,
    RequestBodyType extends DefaultBodyType = DefaultBodyType,
  >(
    url: string,
    resolver: MswResolver<ResponseType, RequestBodyType, Params>,
  ): HttpHandler => http.patch(`${BASE_URL}${url}`, resolver),
};
