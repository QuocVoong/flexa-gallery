import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { debounce }                                     from 'lodash';

export function useDimensions() {
  const [height, setHeight] = useState(0);
  const [width, setWidth]   = useState(0);

  // The following measures the size of the div and listens to changes
  const targetRef     = useRef();
  const RESET_TIMEOUT = 100;

  const div_dimensions = () => {
    setHeight(targetRef.current.offsetHeight);
    setWidth(targetRef.current.offsetWidth);
  };

  const useEnhancedEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useEnhancedEffect(() => {
    div_dimensions();
  }, []);

  const debouncedDimensions = debounce(div_dimensions, RESET_TIMEOUT);

  useEffect(() => {
    window.addEventListener('resize', debouncedDimensions);
    return () => {
      window.removeEventListener('resize', debouncedDimensions);
    };
  });

  return [{ height, width }, targetRef];
}
