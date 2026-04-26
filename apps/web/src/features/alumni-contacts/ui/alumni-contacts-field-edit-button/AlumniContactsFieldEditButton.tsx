import { Button, type IconTokenColor, mergeStyles, Pen } from '@causw/cds';

interface AlumniContactsFieldEditButtonProps {
  iconSize: number;
  iconColor: IconTokenColor;
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
}

export const AlumniContactsFieldEditButton = ({
  iconSize,
  iconColor,
  onClick,
  ariaLabel,
  className,
}: AlumniContactsFieldEditButtonProps) => {
  return (
    <Button
      onClick={onClick}
      type="button"
      className={mergeStyles(
        'h-fit w-fit p-0 hover:bg-transparent!',
        className,
      )}
      aria-label={ariaLabel}
    >
      <Pen size={iconSize} color={iconColor} />
    </Button>
  );
};
