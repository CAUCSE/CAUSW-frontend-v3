import { getHandler } from './get';
import { postHandler } from './post';

export const authHandler = [...getHandler, ...postHandler];
