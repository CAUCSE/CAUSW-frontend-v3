import { mergeStyles } from '@causw/cds';

export const lockerApplyModalDefaultCss = (isMobileSize: boolean) =>
  mergeStyles(
    'flex flex-col overflow-hidden bg-gray-100 md:h-187.5 md:w-142 lg:w-175',
    isMobileSize &&
      'animate-none! transition-none! data-[state=closed]:animate-none! data-[state=open]:animate-none!',
  );
