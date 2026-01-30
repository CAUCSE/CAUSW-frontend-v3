import { Float } from '@causw/cds';

type Props = {
  show?: boolean;
};

export function NotificationDot({ show }: Props) {
  if (!show) return null;

  return (
    <Float floatType="absolute" top={-2} right={-2}>
      <div className="h-1 w-1 rounded-full bg-red-500" />
    </Float>
  );
}
