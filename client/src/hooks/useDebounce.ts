import { useRef } from "react";

export const useDebounce = (delay: number) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedFunction = (func: any) => {
    return (...args: any) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  return debouncedFunction;
};
