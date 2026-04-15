import { useEffect } from 'react';

export const useSplashScreen = ({ onFinish } = {}) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (typeof onFinish === 'function') {
        onFinish();
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [onFinish]);

  return {};
};
