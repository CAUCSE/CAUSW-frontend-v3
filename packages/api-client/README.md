# @causw/api-client

CAUSW 프론트엔드 모노레포에서 사용하는 공통 API 클라이언트 패키지입니다.
`fetch` API를 기반으로 하며, Axios와 유사한 인터셉터(Interceptor) 패턴을 제공하여 요청과 응답을 유연하게 제어할 수 있습니다.

## 설치

이 패키지는 모노레포 내부 패키지입니다. 사용하는 앱의 `package.json`에 의존성을 추가하세요.

```bash
pnpm add @causw/api-client --filter <app-name>
```

## 기본 사용법

`createApiClient` 팩토리 함수를 사용하여 클라이언트 인스턴스를 생성합니다.

```typescript
import { createApiClient } from '@causw/api-client';

const client = createApiClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL, // 기본값
});

// GET 요청
const getUser = async (id: string) => {
  const user = await client.get<{ id: string; name: string }>(`/users/${id}`);
  return user;
};

// POST 요청
const createUser = async (userData: { name: string }) => {
  const newUser = await client.post('/users', userData);
  return newUser;
};
```

## 인터셉터 (Interceptors)

Axios와 유사한 방식으로 요청(Request)과 응답(Response)을 가로채서 로직을 추가할 수 있습니다.

### 요청 인터셉터 (Request Interceptor)

요청이 전송되기 전에 헤더를 수정하거나 로그를 남길 수 있습니다.

```typescript
client.interceptors.request.register((config) => {
  console.log(`[Request] ${config.options.method} ${config.url}`);

  // 예: 토큰이 있다면 헤더에 추가
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.options.headers = {
      ...config.options.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  
  return config;
});
```

### 응답 인터셉터 (Response Interceptor)

응답을 받은 직후, 데이터를 가공하거나 에러를 처리할 수 있습니다.

```typescript
client.interceptors.response.register(
  (response) => {
    console.log(`[Response] ${response.status} ${response.url}`);
    return response;
  },
  (error) => {
    console.error('[Response Error]', error);
    return Promise.reject(error);
  }
);
```

## 에러 처리

`ApiClient`는 응답 상태 코드가 200-299 범위를 벗어나면 에러를 발생시킵니다.
`try-catch` 블록을 사용하여 에러를 처리할 수 있습니다.

```typescript
try {
  await client.get('/error-endpoint');
} catch (error) {
  console.error('API 호출 실패:', error);
}
```
