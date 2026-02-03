# @causw/logger

CAUSW 프론트엔드 모노레포에서 사용하는 표준 Sentry 로깅 패키지입니다.
`@sentry/nextjs`를 래핑하여 표준화된 에러 처리, 태깅, 설정 기능을 제공합니다.

## 설치

이 패키지는 모노레포 내부 패키지입니다. 사용하는 앱의 `package.json`에 의존성을 추가하세요.

```bash
pnpm add @causw/logger --filter <app-name>
```

## 설정

### 1. 환경 변수 설정

프로젝트 루트의 `.env` 파일에 Sentry DSN을 설정해야 합니다.

```bash
NEXT_PUBLIC_SENTRY_DSN=your_dsn_here
```

### 2. Next.js Config 설정 (`next.config.ts`)

`withSentryConfig`를 사용하여 Next.js 설정을 감싸줍니다. 빌드 시 소스맵 업로드 및 릴리즈 설정을 자동으로 처리합니다.

```typescript
import { withSentryConfig } from '@causw/logger/config';

const nextConfig: NextConfig = {
  // ... 기존 설정
};

// 두 번째 인자로 프로젝트 이름(Sentry Project Slug)을 넘겨주세요.
export default withSentryConfig<NextConfig>(nextConfig, 'project-name');
```

### 3. Sentry 초기화 (`instrumentation-client.ts` 또는 설정 파일)

Next.js의 `instrumentation-client.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`에서 초기화 함수를 호출합니다.

```typescript
import { initSentry } from '@causw/logger';

initSentry({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  // 추가 옵션이 필요하다면 전달 가능
  options: {
    tracesSampleRate: 1.0,
  },
});
```

## 사용법

### 1. API 에러 캡처 (`reportApiError`)

API 요청 중 발생한 에러를 자동으로 파싱하여 적절한 레벨과 태그로 Sentry에 전송합니다.

- **500 이상:** `fatal` 레벨, `server_error` 태그
- **400 대:** `warning` 레벨, `unexpected_error` 태그 (일반적인 클라이언트 에러는 무시될 수 있음)

```typescript
import { reportApiError } from '@causw/logger';

try {
  await api.get('/users/me');
} catch (error) {
  // 에러 객체와 함께 (선택사항) URL, Method 정보를 넘길 수 있습니다.
  reportApiError(error, {
    url: '/users/me',
    method: 'GET',
  });
}
```

### 2. 일반 에러 캡처 (`captureSentry`)

API 호출 이외의 로직에서 발생한 에러를 수동으로 분류하여 전송할 때 사용합니다.

```typescript
import { captureSentry } from '@causw/logger';

try {
  dangerousOperation();
} catch (error) {
  captureSentry(
    error,
    'unexpected_error', // 에러 타입 (server_error | unexpected_error | network_error)
    { customKey: 'customValue' }, // 추가 메타 데이터
    'error', // 로그 레벨 (fatal | error | warning)
  );
}
```

### 3. 클라이언트 유틸리티

클라이언트 전용 기능은 `@causw/logger/client`에서 가져옵니다.

```typescript
import { captureRouterTransitionStart } from '@causw/logger/client';

// 페이지 전환 트래킹 등
captureRouterTransitionStart();
```

## 에러 처리 정책

이 패키지는 `@causw/api-client`의 `ApiError` 클래스를 기반으로 에러를 처리하고 Sentry에 전송하도록 최적화되어 있습니다. `ApiError` 객체는 다음과 같은 주요 속성을 포함합니다.

```typescript
class ApiError extends Error {
  public status?: number; // HTTP 상태 코드 (예: 404, 500)
  public data?: {
    code?: string; // API에서 정의한 에러 코드
    message?: string; // API에서 정의한 에러 메시지
    // ... 외 추가 데이터
  };
  // ... 외 다른 속성
}
```

- **Server Error (5xx):** `Fatal` 레벨로 기록되며, 즉시 대응이 필요한 에러로 간주합니다.
- **Client Error (4xx):** `Warning` 레벨로 기록됩니다.
- **Network Error:** 응답이 없거나 `ApiError` 인스턴스가 아닌 경우 `network_error`로 기록됩니다.

## 파일 구조

```text
src/
├── types/          # 타입 정의
├── lib/            # 로깅 구현체 (logger, utils)
├── client.ts       # 클라이언트 전용 엔트리
├── config.ts       # next.config.ts 설정 엔트리
└── index.ts        # 메인 엔트리 (서버/공통)

```
