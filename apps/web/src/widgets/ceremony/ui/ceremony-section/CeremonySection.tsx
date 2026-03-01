import { BellColored } from '@causw/cds';

import type { CeremonyItem } from '@/entities/ceremony';
import { CeremonyListItem } from '@/entities/ceremony';

import { NoDataView } from '@/shared/ui/fallback';

interface CeremonySectionProps {
  title: string;
  items: CeremonyItem[];
  emptyMessage?: string;
  onItemClick?: (id: string) => void;
}

export const CeremonySection = ({
  title,
  items,
  emptyMessage,
  onItemClick,
}: CeremonySectionProps) => (
  <div className="flex flex-col gap-2 px-5">
    <h3 className="typo-subtitle-16-bold text-gray-700">{title}</h3>
    {items.length === 0 ? (
      <NoDataView
        message={emptyMessage}
        icon={<BellColored size={52} className="opacity-50 grayscale" />}
      />
    ) : (
      items.map((item) => (
        <CeremonyListItem
          key={item.id}
          item={item}
          onClick={() => onItemClick?.(item.id)}
        />
      ))
    )}
  </div>
);
