const PHONE_NUMBER_MAX_LENGTH = 11;

const onlyDigits = (value: string) => value.replace(/[^0-9]/g, '');

/**
 * 숫자만으로 이루어진 문자열을 하이픈이 포함된 전화번호 형식으로 변환합니다.
 * @param digits 숫자만 포함된 문자열
 * @returns 하이픈이 포함된 전화번호 형식의 문자열
 */
const formatPhoneNumber = (digits: string) => {
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, PHONE_NUMBER_MAX_LENGTH)}`;
};

/**
 * 포맷팅된 전화번호 문자열에서 커서의 위치를 계산합니다.
 * @param formattedValue 포맷팅된 전화번호 문자열
 * @param digitCount 커서가 위치할 곳 앞의 숫자 개수
 * @returns 커서의 위치
 */
const getCaretPositionByDigitCount = (
  formattedValue: string,
  digitCount: number,
) => {
  if (digitCount <= 0) return 0;

  let seenDigits = 0;

  for (let i = 0; i < formattedValue.length; i += 1) {
    if (/[0-9]/.test(formattedValue[i])) {
      seenDigits += 1;
      if (seenDigits === digitCount) return i + 1;
    }
  }

  return formattedValue.length;
};

/**
 * 입력값의 커서 위치를 유지하면서 전화번호를 포맷팅합니다.
 * @param rawValue 사용자가 입력한 전화번호 문자열
 * @param selectionStart 사용자가 입력한 전화번호 문자열에서의 커서 위치
 * @returns 포맷팅된 전화번호 문자열과 커서의 위치
 */
export const formatPhoneNumberWithCaret = (
  rawValue: string,
  selectionStart: number,
) => {
  const normalizedSelectionStart = Math.max(0, selectionStart);
  const rawBeforeCaret = rawValue.slice(0, normalizedSelectionStart);

  const digits = onlyDigits(rawValue).slice(0, PHONE_NUMBER_MAX_LENGTH);
  const digitsBeforeCaret = onlyDigits(rawBeforeCaret).slice(
    0,
    PHONE_NUMBER_MAX_LENGTH,
  ).length;

  const formattedValue = formatPhoneNumber(digits);
  const nextCaretPosition = getCaretPositionByDigitCount(
    formattedValue,
    digitsBeforeCaret,
  );

  return {
    formattedValue,
    nextCaretPosition,
  };
};
