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
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
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

## Content-Type 처리

- **기본값**: `application/json` (body가 자동으로 `JSON.stringify`됨)
- **사용자 지정**: `headers['Content-Type']`을 직접 설정하면 해당 값 사용

```typescript
// JSON (기본값)
await client.post('/api/users', { name: '홍길동' });

// FormData (파일 업로드)
const formData = new FormData();
formData.append('file', imageFile);
formData.append('metadata', JSON.stringify({ title: '프로필 사진' }));

await client.post('/api/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});
```

> **참고**: `multipart/form-data` 지정 시 body는 stringify되지 않고 그대로 전송됩니다.

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

### 기본 에러 처리

`ApiClient`는 응답 상태 코드가 200-299 범위를 벗어나면 `ApiError`를 발생시킵니다.

```typescript
import { ApiError } from '@causw/api-client';

try {
  await client.get('/error-endpoint');
} catch (error) {
  if (error instanceof ApiError) {
    console.error('API Error:', error.status, error.statusText);
    console.error('Error Data:', error.data);
  } else {
    console.error('Unknown Error:', error);
  }
}
```

### 타입가드 사용

`isApiClientError`와 `hasResponse` 타입가드를 사용하면 더 안전한 에러 처리가 가능합니다.

```typescript
import { isApiClientError, hasResponse } from '@causw/api-client';

try {
  await client.get('/users/123');
} catch (error) {
  // ApiError인지 확인
  if (isApiClientError(error)) {
    console.error('Status:', error.status);
    console.error('Status Text:', error.statusText);
    
    // 응답 데이터가 있는지 확인
    if (hasResponse(error)) {
      console.error('Response Data:', error.data);
    }
  } else {
    // 네트워크 에러 등 다른 에러
    console.error('Unknown Error:', error);
  }
}
```

### 특정 타입의 에러 응답 처리

`hasResponseOfType`을 사용하여 에러 응답의 타입을 체크할 수 있습니다.

```typescript
import { isApiClientError, hasResponseOfType } from '@causw/api-client';

interface ErrorResponse {
  message: string;
  code: string;
  details?: Record<string, string[]>;
}

try {
  await client.post('/users', userData);
} catch (error) {
  if (isApiClientError(error) && hasResponseOfType<ErrorResponse>(error)) {
    // error.data가 ErrorResponse 타입임을 보장
    console.error('Error Message:', error.data.message);
    console.error('Error Code:', error.data.code);
    
    if (error.data.details) {
      console.error('Validation Errors:', error.data.details);
    }
  }
}
```

### 커스텀 validator와 함께 사용

```typescript
function isErrorResponse(data: unknown): data is ErrorResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'message' in data &&
    'code' in data
  );
}

try {
  await client.post('/users', userData);
} catch (error) {
  if (isApiClientError(error) && hasResponseOfType(error, isErrorResponse)) {
    // error.data가 ErrorResponse 타입임을 보장
    console.error(error.data.message);
  }
}
```

## 타입가드 API

### `isApiClientError(error: unknown): error is ApiError`

에러가 `ApiError` 인스턴스인지 확인합니다.

### `hasResponse(error: ApiError): boolean`

`ApiError`에 응답 데이터(`data`)가 있는지 확인합니다.

### `hasResponseOfType<T>(error: ApiError, validator?: (data: unknown) => data is T): boolean`

`ApiError`의 응답 데이터가 특정 타입 `T`인지 확인합니다.
선택적으로 `validator` 함수를 제공하여 런타임 타입 검증을 수행할 수 있습니다.
