import { getHandler } from './get';
import { patchHandler } from './patch';
import { postHandler } from './post';

export const authHandler = [...getHandler, ...patchHandler, ...postHandler];
