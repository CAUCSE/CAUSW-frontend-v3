import { Radio, RadioGroup } from '@causw/cds';

import { type ReportReason } from '@/entities/report';

import { REPORT_OPTIONS } from '../config';

interface ReasonSelectRadioProps {
  value: ReportReason;
  onChange: (value: ReportReason) => void;
}

export const ReasonSelectRadio = ({
  value,
  onChange,
}: ReasonSelectRadioProps) => {
  const entries = Object.entries(REPORT_OPTIONS) as [
    ReportReason,
    (typeof REPORT_OPTIONS)[ReportReason],
  ][];

  return (
    <RadioGroup
      name="report-reason"
      value={value}
      onValueChange={(val) => onChange(val as ReportReason)}
    >
      {entries.map(([key, option]) => (
        <Radio key={key} value={key}>
          {option.label}
        </Radio>
      ))}
    </RadioGroup>
  );
};
