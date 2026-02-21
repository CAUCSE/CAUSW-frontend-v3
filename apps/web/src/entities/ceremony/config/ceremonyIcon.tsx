import {
  HeartColored,
  BabyColored,
  BuildingColored,
  PresentColored,
  FlowerColored,
  HospitalColored,
  BellColored,
} from '@causw/cds';

import type { CeremonyCategory } from '@/shared/types';

const CEREMONY_ICON_MAP: Record<string, React.ReactNode> = {
  결혼식: <HeartColored size={24} />,
  돌잔치: <BabyColored size={24} />,
  개업: <BuildingColored size={24} />,
  생신잔치: <PresentColored size={24} />,
  장례식: <FlowerColored size={24} />,
  사고: <HospitalColored size={24} />,
  투병: <HospitalColored size={24} />,
};

const DEFAULT_ICON = <BellColored size={24} />;

export const getCeremonyIcon = (category: CeremonyCategory): React.ReactNode =>
  CEREMONY_ICON_MAP[category] ?? DEFAULT_ICON;
