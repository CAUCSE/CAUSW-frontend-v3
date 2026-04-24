export const isAuthRoute = (pathname: string): boolean => {
  return pathname.startsWith('/auth');
};
