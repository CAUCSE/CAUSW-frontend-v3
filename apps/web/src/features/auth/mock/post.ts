// import { HttpResponse } from 'msw';

// import {
//   SigninResponseDto,
//   SignoutResponseDto,
//   SignupResponseDto,
// } from '@/entities/auth';

// import { mswHttp } from '@/shared/lib';

// const AUTH_API_PREFIX = '/api/v2/auth';

export const postHandler = [
  // mswHttp.post<SignupResponseDto>(`${AUTH_API_PREFIX}/signup`, () => {
  //   return HttpResponse.json(
  //     {
  //       code: '201',
  //       message: 'Signup successful',
  //       data: {
  //         accessToken: '1234567890',
  //         name: 'John Doe',
  //         email: 'john.doe@example.com',
  //         profileImgUrl: 'https://picsum.photos/seed/profile1/200/200',
  //       },
  //     },
  //     {
  //       status: 201,
  //     },
  //   );
  // }),
  // mswHttp.post<SigninResponseDto>(`${AUTH_API_PREFIX}/login`, () => {
  //   return HttpResponse.json(
  //     {
  //       code: '201',
  //       message: 'Login successful',
  //       data: {
  //         accessToken: '1234567890',
  //         name: 'John Doe',
  //         email: 'john.doe@example.com',
  //         profileImgUrl: 'https://picsum.photos/seed/profile1/200/200',
  //       },
  //     },
  //     { status: 201 },
  //   );
  // }),
  // mswHttp.post<SignoutResponseDto>(`${AUTH_API_PREFIX}/logout`, () => {
  //   return HttpResponse.json(
  //     {
  //       code: '204',
  //       data: undefined,
  //     },
  //     { status: 204 },
  //   );
  // }),
];
