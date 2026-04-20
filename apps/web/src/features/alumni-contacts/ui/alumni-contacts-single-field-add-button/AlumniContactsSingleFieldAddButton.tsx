import { Button, Plus, Text } from '@causw/cds';

interface AlumniContactsSingleFieldAddButtonProps {
  label: string;
  onClick?: () => void;
}

export const AlumniContactsSingleFieldAddButton = ({
  label,
  onClick,
}: AlumniContactsSingleFieldAddButtonProps) => {
  return (
    <Button
      color="gray"
      className="h-13 rounded-md"
      onClick={onClick}
      type="button"
    >
      <Plus size={20} color="gray-500" />
      <Text typography="body-15-semibold" textColor="gray-500">
        {label}
      </Text>
    </Button>
  );
};
