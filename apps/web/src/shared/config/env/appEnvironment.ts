export type RawAppEnv = 'local-dev' | 'local-prod' | 'dev' | 'prod';
export type UpdateEnv = 'dev' | 'prod';

export function getRawAppEnv(): RawAppEnv {
  const env = process.env.NEXT_PUBLIC_APP_ENV as RawAppEnv | undefined;

  switch (env) {
    case 'local-dev':
    case 'local-prod':
    case 'dev':
    case 'prod':
      return env;
    default:
      return 'local-dev';
  }
}

export function getUpdateEnv(): UpdateEnv {
  const rawEnv = getRawAppEnv();

  switch (rawEnv) {
    case 'local-dev':
    case 'dev':
      return 'dev';

    case 'local-prod':
    case 'prod':
      return 'prod';

    default:
      return 'dev';
  }
}
