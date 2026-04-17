'use client';

import { DatePicker } from '@causw/cds';

interface AlumniContactsProfileEntryDatePickerProps {
  date?: Date;
  onDateChange?: (date: Date) => void;
}

export const AlumniContactsProfileEntryDatePicker = ({
  date,
  onDateChange,
}: AlumniContactsProfileEntryDatePickerProps) => {
  return (
    <DatePicker
      placeholder="연도-월"
      dateFormat="yyyy-MM"
      value={date}
      onValueChange={onDateChange}
      className="flex-1 bg-gray-100"
    />
  );
};
