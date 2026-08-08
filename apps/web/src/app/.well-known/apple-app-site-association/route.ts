import { ENVIRONMENT } from '@/shared/config';

export const dynamic = 'force-static';

const APP_ID =
  ENVIRONMENT === 'production'
    ? 'U294A2ABLV.kr.co.causw'
    : 'U294A2ABLV.kr.co.causw.dev';

export function GET() {
  return Response.json(
    {
      applinks: {
        details: [
          {
            appIDs: [APP_ID],
            components: [
              { '/': '/api/*', exclude: true },
              { '/': '/auth/*', exclude: true },
              { '/': '/.well-known/*', exclude: true },
              { '/': '/feed/*' },
              { '/': '/notification*' },
              { '/': '/alumni-contacts/*' },
              { '/': '/ceremony/*' },
              { '/': '/locker/*' },
            ],
          },
        ],
      },
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=3600',
        'Content-Type': 'application/json',
      },
    },
  );
}
