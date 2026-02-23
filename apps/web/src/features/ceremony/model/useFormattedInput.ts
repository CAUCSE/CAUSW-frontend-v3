import { useCallback } from 'react';

export const useFormattedInput = (
  formatter: (v: string) => string,
  setter: (v: string) => void,
) =>
  useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target;
      const raw = input.value;
      const cursor = input.selectionStart ?? raw.length;
      const formatted = formatter(raw);
      setter(formatted);

      const diff = formatted.length - raw.length;
      requestAnimationFrame(() => {
        const pos = cursor + diff;
        input.setSelectionRange(pos, pos);
      });
    },
    [formatter, setter],
  );
