import {
  http,
  HttpHandler,
  HttpResponseResolver,
  PathParams,
  type DefaultBodyType,
} from 'msw';

import { BASE_URL } from '@/shared/config';
import { DefaultResponseField } from '@/shared/types';

type MswResolver<T, U extends DefaultBodyType> = HttpResponseResolver<
  PathParams,
  U,
  DefaultResponseField<T>
>;

export const mswHttp = {
  get: <T, RequestBodyType extends DefaultBodyType = DefaultBodyType>(
    url: string,
    resolver: MswResolver<T, RequestBodyType>,
  ): HttpHandler => http.get(`${BASE_URL}${url}`, resolver),
  post: <T, RequestBodyType extends DefaultBodyType = DefaultBodyType>(
    url: string,
    resolver: MswResolver<T, RequestBodyType>,
  ): HttpHandler => http.post(`${BASE_URL}${url}`, resolver),
  put: <T, RequestBodyType extends DefaultBodyType = DefaultBodyType>(
    url: string,
    resolver: MswResolver<T, RequestBodyType>,
  ): HttpHandler => http.put(`${BASE_URL}${url}`, resolver),
  delete: <T, RequestBodyType extends DefaultBodyType = DefaultBodyType>(
    url: string,
    resolver: MswResolver<T, RequestBodyType>,
  ): HttpHandler => http.delete(`${BASE_URL}${url}`, resolver),
  patch: <T, RequestBodyType extends DefaultBodyType = DefaultBodyType>(
    url: string,
    resolver: MswResolver<T, RequestBodyType>,
  ): HttpHandler => http.patch(`${BASE_URL}${url}`, resolver),
};
