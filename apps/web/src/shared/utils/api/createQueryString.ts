import { isNil } from 'es-toolkit';

type QueryValue = string | number | boolean | null | undefined;
type QueryParams<T extends object> = {
  [K in keyof T]: QueryValue | QueryValue[];
};
type QueryParamEntry = [string, QueryValue | QueryValue[]];

export const createQueryString = <
  TQuery extends object,
  TOverride extends object = Record<string, never>,
>(
  query: QueryParams<TQuery>,
  overrideParams?: QueryParams<TOverride>,
): string => {
  const searchParams = new URLSearchParams();

  const setParam = (key: string, value: QueryValue | QueryValue[]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (!isNil(item) && item !== '') {
          searchParams.append(key, String(item));
        }
      });
      return;
    }

    if (!isNil(value) && value !== '') {
      searchParams.set(key, String(value));
    }
  };

  (Object.entries(query) as QueryParamEntry[]).forEach(([key, value]) =>
    setParam(key, value),
  );
  (Object.entries(overrideParams ?? {}) as QueryParamEntry[]).forEach(
    ([key, value]) => setParam(key, value),
  );

  return searchParams.toString();
};
