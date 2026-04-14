type Environment = 'development' | 'production' | 'local';

export const ENVIRONMENT =
  (process.env.NEXT_PUBLIC_ENVIRONMENT as Environment) ?? 'local';
