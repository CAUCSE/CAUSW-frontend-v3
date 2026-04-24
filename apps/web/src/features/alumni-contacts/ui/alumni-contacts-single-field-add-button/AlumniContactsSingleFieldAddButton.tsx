import { Button, Plus, Text } from '@causw/cds';

interface AlumniContactsSingleFieldAddButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const AlumniContactsSingleFieldAddButton = ({
  label,
  onClick,
  disabled = false,
}: AlumniContactsSingleFieldAddButtonProps) => {
  return (
    <Button
      color="gray"
      className="h-13 rounded-md"
      onClick={onClick}
      type="button"
      disabled={disabled}
    >
      <Plus size={20} color="gray-500" />
      <Text typography="body-15-semibold" textColor="gray-500">
        {label}
      </Text>
    </Button>
  );
};
