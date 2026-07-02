import {
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  useRef,
  useState,
} from 'react';

import {
  DIGIT_REGEXP,
  YEAR_MONTH_SECTION,
  type YearMonthSection,
} from './YearMonthField.constant';
import {
  appendMonthDigit,
  appendYearDigit,
  createMonthFromDigits,
  formatMonth,
  formatYear,
  incrementMonth,
  incrementYear,
} from './YearMonthField.util';

interface UseYearMonthFieldProps {
  year: string;
  month: string;
  onYearChange: (year: string) => void;
  onMonthChange: (month: string) => void;
}

export const useYearMonthField = ({
  year,
  month,
  onYearChange,
  onMonthChange,
}: UseYearMonthFieldProps) => {
  const [activeSection, setActiveSection] = useState<YearMonthSection | null>(
    null,
  );

  const yearInputRef = useRef<HTMLInputElement>(null);
  const monthInputRef = useRef<HTMLInputElement>(null);
  const isYearEditingRef = useRef(false);
  const isMonthEditingRef = useRef(false);
  const isYearComposingRef = useRef(false);
  const isMonthComposingRef = useRef(false);

  const yearDisplayText = formatYear(year);
  const monthDisplayText = formatMonth(month);

  // IME 조합 입력 중에는 keydown 로직이 값을 가로채지 않도록 상태를 켠다.
  const handleCompositionStart = (section: YearMonthSection) => {
    if (section === YEAR_MONTH_SECTION.YEAR) {
      isYearComposingRef.current = true;
      return;
    }

    isMonthComposingRef.current = true;
  };

  // IME 조합 입력이 끝나면 다시 일반 keydown 입력을 처리할 수 있게 한다.
  const handleCompositionEnd = (section: YearMonthSection) => {
    if (section === YEAR_MONTH_SECTION.YEAR) {
      isYearComposingRef.current = false;
      return;
    }

    isMonthComposingRef.current = false;
  };

  // 연도 input의 직접 변경 값을 숫자 4자리로 정리하고, 완성되면 월로 이동한다.
  const handleYearChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, '').slice(-4);
    isYearEditingRef.current = true;
    onYearChange(value);

    if (value.length === 4) {
      focusSection(monthInputRef.current, YEAR_MONTH_SECTION.MONTH);
    }
  };

  // 월 input의 직접 변경 값을 숫자로 정리하고 1~12 범위에 맞는 월 형태로 만든다.
  const handleMonthChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = createMonthFromDigits(event.target.value.replace(/\D/g, ''));
    isMonthEditingRef.current = true;
    onMonthChange(value);
  };

  // 섹션에 focus가 들어오면 활성 섹션을 표시하고 전체 값을 선택 상태로 둔다.
  const handleSectionFocus = (
    event: FocusEvent<HTMLInputElement>,
    section: YearMonthSection,
  ) => {
    setActiveSection(section);

    if (section === YEAR_MONTH_SECTION.YEAR) {
      isYearEditingRef.current = false;
    } else {
      isMonthEditingRef.current = false;
    }

    event.currentTarget.select();
  };

  // 이미 focus된 섹션을 다시 클릭해도 부분 커서가 생기지 않고 전체 선택을 유지한다.
  const handleSectionClick = (event: MouseEvent<HTMLInputElement>) => {
    event.currentTarget.select();
  };

  // click 직후 브라우저가 선택 영역을 해제하지 않도록 기본 mouseup 동작을 막는다.
  const handleSectionMouseUp = (event: MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
  };

  // 모바일에서 길게 누를 때 텍스트 선택 메뉴가 뜨지 않도록 context menu 기본 동작을 막는다.
  const handleContextMenu = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
  };

  // input이 아닌 wrapper 영역을 클릭하면 기본 진입점인 연도 섹션으로 focus를 보낸다.
  const handleWrapperClick = (event: MouseEvent<HTMLElement>) => {
    if (
      event.target === yearInputRef.current ||
      event.target === monthInputRef.current
    ) {
      return;
    }

    focusSection(yearInputRef.current, YEAR_MONTH_SECTION.YEAR);
  };

  // 연도와 월 input 바깥으로 focus가 완전히 빠질 때만 활성 섹션 표시를 제거한다.
  const handleSectionBlur = (event: FocusEvent<HTMLInputElement>) => {
    const nextFocusTarget = event.relatedTarget;

    if (
      nextFocusTarget !== yearInputRef.current &&
      nextFocusTarget !== monthInputRef.current
    ) {
      setActiveSection(null);
    }
  };

  // 특정 섹션으로 focus를 이동하고, 다음 숫자 입력이 기존 값을 대체하도록 편집 상태를 초기화한다.
  const focusSection = (
    element: HTMLInputElement | null,
    section: YearMonthSection,
  ) => {
    setActiveSection(section);

    if (section === YEAR_MONTH_SECTION.YEAR) {
      isYearEditingRef.current = false;
    } else {
      isMonthEditingRef.current = false;
    }

    element?.focus();
    element?.select();
  };

  // 값 변경으로 rerender된 뒤에도 현재 섹션의 전체 선택 상태가 유지되도록 한다.
  const selectSectionAfterRender = (element: HTMLInputElement | null) => {
    window.requestAnimationFrame(() => {
      element?.select();
    });
  };

  // 연도 섹션의 키보드 입력을 MUI DatePicker처럼 숫자 누적, 삭제, 증감, 섹션 이동으로 해석한다.
  const handleYearKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing || isYearComposingRef.current) {
      return;
    }

    if (DIGIT_REGEXP.test(event.key)) {
      event.preventDefault();
      const nextYear = appendYearDigit({
        currentYear: year,
        digit: event.key,
        shouldReplace: !isYearEditingRef.current,
      });

      onYearChange(nextYear);
      isYearEditingRef.current = true;

      if (nextYear.length === 4) {
        focusSection(monthInputRef.current, YEAR_MONTH_SECTION.MONTH);
        return;
      }

      selectSectionAfterRender(yearInputRef.current);
      return;
    }

    if (event.key === 'Backspace') {
      event.preventDefault();
      onYearChange('');
      isYearEditingRef.current = false;
      selectSectionAfterRender(yearInputRef.current);
      return;
    }

    if (event.key === 'Delete') {
      event.preventDefault();
      onYearChange('');
      isYearEditingRef.current = true;
      selectSectionAfterRender(yearInputRef.current);
      return;
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      onYearChange(
        incrementYear({
          currentYear: year,
          amount: event.key === 'ArrowUp' ? 1 : -1,
        }),
      );
      isYearEditingRef.current = false;
      selectSectionAfterRender(yearInputRef.current);
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      focusSection(monthInputRef.current, YEAR_MONTH_SECTION.MONTH);
      return;
    }

    if (event.key.length === 1) {
      event.preventDefault();
    }
  };

  // 월 섹션의 키보드 입력을 숫자 누적, 삭제, 순환 증감, 연도 섹션 이동으로 해석한다.
  const handleMonthKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing || isMonthComposingRef.current) {
      return;
    }

    if (DIGIT_REGEXP.test(event.key)) {
      event.preventDefault();
      onMonthChange(
        appendMonthDigit({
          currentMonth: month,
          digit: event.key,
          shouldReplace: !isMonthEditingRef.current,
        }),
      );
      isMonthEditingRef.current = true;
      selectSectionAfterRender(monthInputRef.current);
      return;
    }

    if (event.key === 'Backspace') {
      event.preventDefault();
      onMonthChange('');
      isMonthEditingRef.current = false;
      selectSectionAfterRender(monthInputRef.current);
      return;
    }

    if (event.key === 'Delete') {
      event.preventDefault();
      onMonthChange('');
      isMonthEditingRef.current = true;
      selectSectionAfterRender(monthInputRef.current);
      return;
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      onMonthChange(
        incrementMonth({
          currentMonth: month,
          amount: event.key === 'ArrowUp' ? 1 : -1,
        }),
      );
      isMonthEditingRef.current = false;
      selectSectionAfterRender(monthInputRef.current);
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      focusSection(yearInputRef.current, YEAR_MONTH_SECTION.YEAR);
      return;
    }

    if (event.key.length === 1) {
      event.preventDefault();
    }
  };

  return {
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
    handleContextMenu,
    handleWrapperClick,
    handleSectionBlur,
    handleYearKeyDown,
    handleMonthKeyDown,
    handleCompositionStart,
    handleCompositionEnd,
  };
};
