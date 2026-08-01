export const dynamic = 'force-static';

export function GET() {
  return Response.json(
    {
      applinks: {
        details: [
          {
            appIDs: ['U294A2ABLV.kr.co.causw', 'U294A2ABLV.kr.co.causw.dev'],
            components: [
              { '/': '/api/*', exclude: true },
              { '/': '/auth/*', exclude: true },
              { '/': '/.well-known/*', exclude: true },
              { '/': '/feed/*' },
              { '/': '/notification*' },
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
