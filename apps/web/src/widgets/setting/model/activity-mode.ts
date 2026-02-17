import { ActivityMode } from '@/entities/setting';

export const toActivityMode = (view?: string): ActivityMode => {
  return view === 'empty' ? 'empty' : 'list';
};
