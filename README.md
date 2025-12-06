# CAUSW Frontend

중앙대학교 소프트웨어학부 동문 네트워크 프론트엔드 모노레포

## 📁 프로젝트 구조

```
.
├── apps/
│   ├── admin/              # 관리자 앱 (Next.js) - localhost:3001
│   └── student/            # 재학생 앱 (Next.js) - localhost:3000
├── packages/
│   ├── eslint-config/      # 공유 ESLint 설정
│   └── typescript-config/  # 공유 TypeScript 설정
├── pnpm-workspace.yaml
├── turbo.json
└── package.json
```

## 🚀 시작하기

### 의존성 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
# 모든 앱 동시 실행
pnpm dev

# 재학생 앱만 실행 (localhost:3000)
pnpm dev:student

# 관리자 앱만 실행 (localhost:3001)
pnpm dev:admin
```

### 빌드

```bash
# 모든 앱 빌드
pnpm build

# 특정 앱만 빌드
pnpm build:student
pnpm build:admin
```

### 린트 & 포맷팅

```bash
pnpm lint
pnpm lint:fix
pnpm format
pnpm format:fix
```

## 🛠 기술 스택

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Monorepo**: pnpm workspaces + Turborepo
- **Architecture**: Feature-Sliced Design (FSD)
