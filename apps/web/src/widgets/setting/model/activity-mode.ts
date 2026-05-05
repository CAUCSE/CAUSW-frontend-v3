import { type ActivityMode } from '@/entities/setting';

export const toActivityMode = (mode?: string): ActivityMode => {
  return mode === 'empty' ? 'empty' : 'list';
};
