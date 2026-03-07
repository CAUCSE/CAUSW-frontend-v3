export const withQuery = (path: string, queryString?: string): string => {
  if (!queryString) return path;
  return `${path}?${queryString}`;
};
