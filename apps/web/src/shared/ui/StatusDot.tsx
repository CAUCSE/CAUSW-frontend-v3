import { Float } from '@causw/cds';

type DotProps = {
  show?: boolean;
  top?: number;
  right?: number;
  left?: number;
  bottom?: number;
};

export function StatusDot({ show, top = -2, right, left, bottom }: DotProps) {
  if (!show) return null;

  return (
    <Float
      floatType="absolute"
      top={top}
      right={right}
      left={left}
      bottom={bottom}
    >
      <div className="h-1 w-1 rounded-full bg-red-500" />
    </Float>
  );
}
