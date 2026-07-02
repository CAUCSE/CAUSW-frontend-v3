'use client';

import { CalendarIcon, HStack, mergeStyles, Text } from '@causw/cds';

import { YEAR_MONTH_SECTION } from './YearMonthField.constant';
import { useYearMonthField } from './YearMonthField.hook';

interface YearMonthFieldProps {
  year: string;
  month: string;
  onYearChange: (year: string) => void;
  onMonthChange: (month: string) => void;
  className?: string;
}

export const YearMonthField = ({
  year,
  month,
  onYearChange,
  onMonthChange,
  className,
}: YearMonthFieldProps) => {
  const {
    activeSection,
    yearDisplayText,
    monthDisplayText,
    yearInputRef,
    monthInputRef,
    handleYearChange,
    handleMonthChange,
    handleSectionFocus,
    handleSectionClick,
    handleSectionMouseUp,
    handleWrapperClick,
    handleSectionBlur,
    handleYearKeyDown,
    handleMonthKeyDown,
    handleCompositionStart,
    handleCompositionEnd,
  } = useYearMonthField({
    year,
    month,
    onYearChange,
    onMonthChange,
  });

  return (
    <HStack
      gap="none"
      justify="between"
      align="center"
      className={mergeStyles(
        'w-fit shrink-0 cursor-pointer rounded-lg bg-gray-100 px-4 py-3',
        className,
      )}
      onClick={handleWrapperClick}
    >
      <HStack gap="none" align="center">
        <span
          className={mergeStyles(
            'relative inline-block rounded-[2px]',
            activeSection === YEAR_MONTH_SECTION.YEAR && 'bg-blue-200',
          )}
        >
          <span aria-hidden className="invisible whitespace-pre">
            {yearDisplayText}
          </span>
          <input
            value={yearDisplayText}
            placeholder="YYYY"
            onChange={handleYearChange}
            inputMode="numeric"
            maxLength={4}
            className={mergeStyles(
              'absolute inset-0 w-full min-w-0 bg-transparent p-0 text-center caret-transparent outline-none selection:bg-blue-200',
              yearDisplayText === 'YYYY' ? 'text-gray-400' : 'text-gray-700',
            )}
            ref={yearInputRef}
            onFocus={(event) =>
              handleSectionFocus(event, YEAR_MONTH_SECTION.YEAR)
            }
            onBlur={handleSectionBlur}
            onClick={handleSectionClick}
            onMouseUp={handleSectionMouseUp}
            onKeyDown={handleYearKeyDown}
            onCompositionStart={() =>
              handleCompositionStart(YEAR_MONTH_SECTION.YEAR)
            }
            onCompositionEnd={() =>
              handleCompositionEnd(YEAR_MONTH_SECTION.YEAR)
            }
          />
        </span>
        <Text
          typography="body-16-regular"
          textColor={
            yearDisplayText === 'YYYY' && monthDisplayText === 'MM'
              ? 'gray-400'
              : 'gray-700'
          }
        >
          -
        </Text>
        <span
          className={mergeStyles(
            'relative inline-block rounded-[2px]',
            activeSection === YEAR_MONTH_SECTION.MONTH && 'bg-blue-200',
          )}
        >
          <span aria-hidden className="invisible whitespace-pre">
            {monthDisplayText}
          </span>
          <input
            value={monthDisplayText}
            placeholder="MM"
            onChange={handleMonthChange}
            inputMode="numeric"
            maxLength={2}
            className={mergeStyles(
              'absolute inset-0 w-full min-w-0 bg-transparent p-0 text-center caret-transparent outline-none selection:bg-blue-200',
              monthDisplayText === 'MM' ? 'text-gray-400' : 'text-gray-700',
            )}
            ref={monthInputRef}
            onFocus={(event) =>
              handleSectionFocus(event, YEAR_MONTH_SECTION.MONTH)
            }
            onBlur={handleSectionBlur}
            onClick={handleSectionClick}
            onMouseUp={handleSectionMouseUp}
            onKeyDown={handleMonthKeyDown}
            onCompositionStart={() =>
              handleCompositionStart(YEAR_MONTH_SECTION.MONTH)
            }
            onCompositionEnd={() =>
              handleCompositionEnd(YEAR_MONTH_SECTION.MONTH)
            }
          />
        </span>
      </HStack>
      <CalendarIcon size={16} />
    </HStack>
  );
};
