/* eslint-disable */
export function splitVariantProps<
  T extends Record<string, unknown>,
  K extends readonly string[],
>(props: T, variantKeys: K) {
  const picked = {} as any;
  const omitted = {} as any;

  for (const key in props) {
    if (variantKeys.includes(key)) picked[key] = props[key];
    else omitted[key] = props[key];
  }

  return [picked, omitted] as [Pick<T, K[number]>, Omit<T, K[number]>];
}
