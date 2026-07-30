export const dynamic = 'force-static';

export function GET() {
  return Response.json([
    {
      relation: ['delegate_permission/common.handle_all_urls'],
      target: {
        namespace: 'android_app',
        package_name: 'kr.co.causwv2.twa',
        sha256_cert_fingerprints: ['업로드 키 지문', 'Play 앱 서명 키 지문'],
      },
    },
  ]);
}
