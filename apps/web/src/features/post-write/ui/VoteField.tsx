import { RatioChartEditor, RatioChartEditorOption } from '@causw/cds';

import { VoteWriteValue } from '@/entities/post';

interface VoteFieldProps {
  value: VoteWriteValue;
  onChange: (value: VoteWriteValue) => void;
  onRemove: () => void;
}

export const VoteField = ({ value, onChange, onRemove }: VoteFieldProps) => {
  const editorOptions: RatioChartEditorOption[] = value.options.map((opt) => ({
    id: opt.id,
    value: opt.value,
  }));

  const handleOptionsChange = (options: RatioChartEditorOption[]) => {
    onChange({
      ...value,
      options: options.map((opt) => ({
        id: opt.id,
        value: opt.value,
      })),
    });
  };

  const handleAllowMultipleChange = (checked: boolean) => {
    onChange({
      ...value,
      allowMultiple: checked,
    });
  };

  return (
    <RatioChartEditor
      options={editorOptions}
      onOptionsChange={handleOptionsChange}
      allowMultiple={value.allowMultiple}
      onAllowMultipleChange={handleAllowMultipleChange}
      onDelete={onRemove}
    />
  );
};
