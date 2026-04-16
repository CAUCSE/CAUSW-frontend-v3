import { useCallback, useEffect, useRef, useState } from 'react';

interface UseCountdownTimerReturn {
  timeLeft: number;
  formattedTime: string;
  isExpired: boolean;
  isRunning: boolean;
  start: () => void;
  reset: () => void;
}

export const useCountdownTimer = (
  initialSeconds: number,
): UseCountdownTimerReturn => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    clearTimer();
    setTimeLeft(initialSeconds);
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [initialSeconds, clearTimer]);

  const reset = start;

  useEffect(() => clearTimer, [clearTimer]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${String(seconds).padStart(2, '0')}`;
  const isExpired = timeLeft === 0 && !isRunning;

  return { timeLeft, formattedTime, isExpired, isRunning, start, reset };
};
