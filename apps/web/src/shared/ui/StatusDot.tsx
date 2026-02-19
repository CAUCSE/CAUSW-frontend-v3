import { mergeStyles } from '@causw/cds';

type DotProps = {
  show?: boolean;
  top?: number | string;
  right?: number | string;
  left?: number | string;
  bottom?: number | string;
  className?: string;
};

export function StatusDot({
  show,
  top = -2,
  right,
  left,
  bottom,
  className,
}: DotProps) {
  if (!show) return null;

  return (
    <div
      className="absolute z-10 shrink-0"
      style={{
        top: typeof top === 'number' ? `${top}px` : top,
        right: typeof right === 'number' ? `${right}px` : right,
        left: typeof left === 'number' ? `${left}px` : left,
        bottom: typeof bottom === 'number' ? `${bottom}px` : bottom,
      }}
    >
      <div
        className={mergeStyles('rounded-full', 'h-1 w-1 bg-red-500', className)}
      />
    </div>
  );
}
