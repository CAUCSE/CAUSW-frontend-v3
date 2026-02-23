import { Radio, RadioGroup } from '@causw/cds';

import { REPORT_OPTIONS } from '../config';
import { ReportReason } from '../model';

interface ReportReasonSelectProps {
  value: ReportReason;
  onChange: (value: ReportReason) => void;
}

export const ReportReasonSelect = ({
  value,
  onChange,
}: ReportReasonSelectProps) => {
  return (
    <RadioGroup
      name="report-reason"
      value={value}
      onValueChange={(val) => onChange(val as ReportReason)}
    >
      {(Object.keys(REPORT_OPTIONS) as ReportReason[]).map((key) => (
        <Radio key={key} value={key}>
          {REPORT_OPTIONS[key].label}
        </Radio>
      ))}
    </RadioGroup>
  );
};
