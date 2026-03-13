// feature/auth에서 export시 ui 파일이 instrumentation.ts까지 import되는 문제가 있어 직접 import
// import { authHandler } from '@/features/auth/mock';

import { boardsHandler } from '@/entities/feed';
import { notificationHandler } from '@/entities/notification';

export const handlers = [...boardsHandler, ...notificationHandler];
