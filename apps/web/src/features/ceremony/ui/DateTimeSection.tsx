import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { DatePicker, Field, TextInput, Toggle } from '@causw/cds';

import type { CeremonyFormData } from '@/entities/ceremony';

import { FormSection } from '@/shared/ui/form-section';

import { formatTime } from '../model';

export const DateTimeSection = () => {
  const { control, setValue } = useFormContext<CeremonyFormData>();
  const [hasEndDate, hasTime] = useWatch({
    control,
    name: ['hasEndDate', 'hasTime'],
  });

  const handleEndDateToggle = (checked: boolean) => {
    setValue('hasEndDate', checked);
    if (!checked) setValue('endDate', undefined);
  };

  const handleTimeToggle = (checked: boolean) => {
    setValue('hasTime', checked);
    if (!checked) {
      setValue('startTime', '');
      setValue('endTime', '');
    }
  };

  const handleTimeChange =
    (field: 'startTime' | 'endTime') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(field, formatTime(e.target.value));
    };

  return (
    <FormSection title="경조사 기간">
      <div className="flex flex-col gap-3">
        {/* 시작 행 */}
        <div className="flex items-center gap-2">
          <div className="min-w-0 flex-1">
            <Controller
              control={control}
              name="startDate"
              render={({ field }) => (
                <DatePicker
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="연도-월-일"
                  dateFormat="yyyy-MM-dd"
                  className="w-full rounded-xl bg-white"
                  contentClassName="z-modal"
                />
              )}
            />
          </div>
          {(hasEndDate || hasTime) && (
            <>
              <span className="w-2 shrink-0 border-t border-gray-300" />
              <div className="min-w-0 flex-1">
                {hasTime ? (
                  <Controller
                    control={control}
                    name="startTime"
                    render={({ field }) => (
                      <Field>
                        <TextInput
                          value={field.value}
                          onChange={handleTimeChange('startTime')}
                          placeholder="시간"
                          maxLength={5}
                          inputMode="numeric"
                          className="rounded-xl bg-white"
                        />
                      </Field>
                    )}
                  />
                ) : (
                  <Controller
                    control={control}
                    name="endDate"
                    render={({ field }) => (
                      <DatePicker
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="연도-월-일"
                        dateFormat="yyyy-MM-dd"
                        className="w-full rounded-xl bg-white"
                        contentClassName="z-modal"
                      />
                    )}
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
              <Controller
                control={control}
                name="endDate"
                render={({ field }) => (
                  <DatePicker
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="연도-월-일"
                    dateFormat="yyyy-MM-dd"
                    className="w-full rounded-xl bg-white"
                    contentClassName="z-modal"
                  />
                )}
              />
            </div>
            <span className="w-2 shrink-0 border-t border-gray-300" />
            <Controller
              control={control}
              name="endTime"
              render={({ field }) => (
                <Field className="min-w-0 flex-1">
                  <TextInput
                    value={field.value}
                    onChange={handleTimeChange('endTime')}
                    placeholder="시간"
                    maxLength={5}
                    inputMode="numeric"
                    className="rounded-xl bg-white"
                  />
                </Field>
              )}
            />
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
};
