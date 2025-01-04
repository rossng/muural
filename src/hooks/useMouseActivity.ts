import { useEffect, useState } from 'react';

export function useMouseActivity(timeout = 2000) {
  const [isMouseActive, setIsMouseActive] = useState(true);
  const [mouseTimer, setMouseTimer] = useState<number | null>(null);

  useEffect(() => {
    const handleMouseMove = () => {
      setIsMouseActive(true);

      // Clear existing timer
      if (mouseTimer) {
        window.clearTimeout(mouseTimer);
      }

      // Set new timer to hide after specified timeout
      const timerId = window.setTimeout(() => {
        setIsMouseActive(false);
      }, timeout);

      setMouseTimer(timerId);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (mouseTimer) {
        window.clearTimeout(mouseTimer);
      }
    };
  }, [mouseTimer, timeout]);

  return isMouseActive;
}
