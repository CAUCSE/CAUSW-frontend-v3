const getWebOrigin = () => {
  const configuredUrl = process.env.NEXT_PUBLIC_WEB_URL;
  if (configuredUrl) {
    try {
      return new URL(configuredUrl).origin;
    } catch {
      return null;
    }
  }

  return typeof window === 'undefined' ? null : window.location.origin;
};

export const postShareUrl = (postId: string) => {
  const path = `/feed/${encodeURIComponent(postId)}`;
  const origin = getWebOrigin();

  return origin ? new URL(path, origin).toString() : path;
};
