export const dynamic = 'force-static';

type AssetLink = {
  relation: string[];
  target: {
    namespace: 'android_app';
    package_name: string;
    sha256_cert_fingerprints: string[];
  };
};

const getAssetLinks = (): AssetLink[] => {
  const value = process.env.ANDROID_ASSET_LINKS;
  if (!value) return [];

  try {
    const assetLinks: unknown = JSON.parse(value);
    return Array.isArray(assetLinks) ? (assetLinks as AssetLink[]) : [];
  } catch {
    return [];
  }
};

export function GET() {
  return Response.json(getAssetLinks(), {
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
