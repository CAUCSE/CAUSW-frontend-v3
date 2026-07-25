import {
  MAX_MONTH,
  MAX_YEAR,
  MIN_MONTH,
  MIN_YEAR,
} from './YearMonthField.constant';

export const formatYear = (year: string) =>
  year === '' ? 'YYYY' : year.padStart(4, '0');

export const formatMonth = (month: string) =>
  month === '' ? 'MM' : month.padStart(2, '0');

export const appendYearDigit = ({
  currentYear,
  digit,
  shouldReplace,
}: {
  currentYear: string;
  digit: string;
  shouldReplace: boolean;
}) => {
  if (shouldReplace || currentYear.length >= 4) {
    return digit;
  }

  return `${currentYear}${digit}`;
};

export const appendMonthDigit = ({
  currentMonth,
  digit,
  shouldReplace,
}: {
  currentMonth: string;
  digit: string;
  shouldReplace: boolean;
}) => {
  if (shouldReplace || currentMonth.length >= 2) {
    return digit;
  }

  const candidate = `${currentMonth}${digit}`;

  if (candidate.length === 1) {
    return candidate;
  }

  const candidateNumber = Number(candidate);

  if (candidateNumber >= MIN_MONTH && candidateNumber <= MAX_MONTH) {
    return candidate;
  }

  return digit;
};

export const createMonthFromDigits = (digits: string) =>
  [...digits].reduce(
    (month, digit) =>
      appendMonthDigit({
        currentMonth: month,
        digit,
        shouldReplace: month === '',
      }),
    '',
  );

export const incrementYear = ({
  currentYear,
  amount,
}: {
  currentYear: string;
  amount: 1 | -1;
}) => {
  const currentYearNumber =
    currentYear === '' ? (amount > 0 ? 0 : MIN_YEAR) : Number(currentYear);
  const nextYearNumber = Math.min(
    MAX_YEAR,
    Math.max(MIN_YEAR, currentYearNumber + amount),
  );

  return String(nextYearNumber);
};

export const incrementMonth = ({
  currentMonth,
  amount,
}: {
  currentMonth: string;
  amount: 1 | -1;
}) => {
  const currentMonthNumber =
    currentMonth === ''
      ? amount > 0
        ? 0
        : MAX_MONTH + 1
      : Number(currentMonth);
  const nextMonthNumber = currentMonthNumber + amount;

  if (nextMonthNumber > MAX_MONTH) {
    return String(MIN_MONTH);
  }

  if (nextMonthNumber < MIN_MONTH) {
    return String(MAX_MONTH);
  }

  return String(nextMonthNumber);
};
