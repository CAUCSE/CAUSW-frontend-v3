import { DatePicker, Field, TextInput, Toggle } from '@causw/cds';

import { FormSection } from '@/shared/ui/FormSection';

import type { CeremonyFormReturn } from '../model';

type Props = Pick<
  CeremonyFormReturn,
  | 'startDate'
  | 'endDate'
  | 'setStartDate'
  | 'setEndDate'
  | 'startTime'
  | 'endTime'
  | 'hasEndDate'
  | 'hasTime'
  | 'onStartTimeChange'
  | 'onEndTimeChange'
  | 'handleEndDateToggle'
  | 'handleTimeToggle'
>;

export const DateTimeSection = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  startTime,
  endTime,
  hasEndDate,
  hasTime,
  onStartTimeChange,
  onEndTimeChange,
  handleEndDateToggle,
  handleTimeToggle,
}: Props) => (
  <FormSection title="경조사 기간">
    <div className="flex flex-col gap-3">
      {/* 시작 행 */}
      <div className="flex items-center gap-2">
        <div className="min-w-0 flex-1">
          <DatePicker
            value={startDate}
            onValueChange={setStartDate}
            placeholder="연도-월-일"
            dateFormat="yyyy-MM-dd"
            className="w-full rounded-xl bg-white"
            contentClassName="z-modal"
          />
        </div>
        {(hasEndDate || hasTime) && (
          <>
            <span className="w-2 shrink-0 border-t border-gray-300" />
            <div className="min-w-0 flex-1">
              {hasTime ? (
                <Field>
                  <TextInput
                    value={startTime}
                    onChange={onStartTimeChange}
                    placeholder="시간"
                    maxLength={5}
                    inputMode="numeric"
                    className="rounded-xl bg-white"
                  />
                </Field>
              ) : (
                <DatePicker
                  value={endDate}
                  onValueChange={setEndDate}
                  placeholder="연도-월-일"
                  dateFormat="yyyy-MM-dd"
                  className="w-full rounded-xl bg-white"
                  contentClassName="z-modal"
                />
              )}
            </div>
          </>
        )}
      </div>

      {/* 종료 행 (종료일 + 시간 모두 ON일 때만) */}
      {hasEndDate && hasTime && (
        <div className="flex items-center gap-2">
          <div className="min-w-0 flex-1">
            <DatePicker
              value={endDate}
              onValueChange={setEndDate}
              placeholder="연도-월-일"
              dateFormat="yyyy-MM-dd"
              className="w-full rounded-xl bg-white"
              contentClassName="z-modal"
            />
          </div>
          <span className="w-2 shrink-0 border-t border-gray-300" />
          <Field className="min-w-0 flex-1">
            <TextInput
              value={endTime}
              onChange={onEndTimeChange}
              placeholder="시간"
              maxLength={5}
              inputMode="numeric"
              className="rounded-xl bg-white"
            />
          </Field>
        </div>
      )}

      <Toggle checked={hasEndDate} onCheckedChange={handleEndDateToggle}>
        <Toggle.Switch />
        <Toggle.Label>종료일</Toggle.Label>
      </Toggle>
      <Toggle checked={hasTime} onCheckedChange={handleTimeToggle}>
        <Toggle.Switch />
        <Toggle.Label>시간 포함</Toggle.Label>
      </Toggle>
    </div>
  </FormSection>
);
