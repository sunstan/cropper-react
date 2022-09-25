import { useEffect, RefObject } from 'react';

const useOnClickOutside = (ref: RefObject<HTMLElement>, handler?: (e: Event) => void) => {
  useEffect(
    () => {
      const listener = (event: Event) => {
        if (!ref.current || ref.current.contains(event.target as HTMLElement) || ref.current === event.target) {
          return;
        }
        handler?.(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    [ref, handler]
  );
};

export default useOnClickOutside;