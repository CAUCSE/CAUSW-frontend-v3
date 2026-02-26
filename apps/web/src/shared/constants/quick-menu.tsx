import { CafeteriaColored, FlagColored, LockerColored } from '@causw/cds';

import { COPY } from './copy';
import { EXTERNAL_ROUTES, ROUTES } from './routes';

export const QUICK_MENU_ITEMS = [
  {
    label: COPY.QUICK_MENU_MEETINGROOM,
    icon: <FlagColored size={24} />,
    href: EXTERNAL_ROUTES.CAU_MEETINGROOM,
  },
  {
    label: COPY.QUICK_MENU_CAFETERIA,
    icon: <CafeteriaColored size={24} />,
    href: EXTERNAL_ROUTES.CAU_CAFETERIA,
  },
  {
    label: COPY.QUICK_MENU_LOCKER,
    icon: <LockerColored size={24} />,
    href: ROUTES.LOCKER,
  },
];
