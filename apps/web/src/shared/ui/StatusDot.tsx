import { Float, mergeStyles } from '@causw/cds';

type DotProps = {
  show?: boolean;
  top?: number;
  right?: number;
  left?: number;
  bottom?: number;
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
    <Float
      floatType="absolute"
      top={top}
      right={right}
      left={left}
      bottom={bottom}
    >
      <div
        className={mergeStyles('rounded-full', 'h-1 w-1 bg-red-500', className)}
      />
    </Float>
  );
}
