import { mergeStyles } from '@causw/cds';

const LEGEND_ITEMS = [
  { label: '선택 불가', className: 'bg-gray-300' },
  { label: '선택 가능', className: 'border border-gray-300 bg-white' },
  { label: '내 사물함', className: 'bg-blue-500' },
] as const;

export const LockerLegend = () => {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      {LEGEND_ITEMS.map((item) => (
        <div key={item.label} className="flex items-center gap-1.5">
          <span
            className={mergeStyles(
              'h-[1.125rem] w-[1.125rem] rounded',
              item.className,
            )}
          />
          <span className="text-sm font-medium tracking-[-0.0175rem] text-gray-500">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};
