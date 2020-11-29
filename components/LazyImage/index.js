import React, { useState, useCallback, useRef, useEffect } from 'react';
import { InView }                                          from 'react-intersection-observer';
import { Box }                                             from '@chakra-ui/react';

export const LazyImage = (props) => {
  const { children, src, placeholder, noLazyLoad } = props;
  const [isLoading, setIsLoading]                  = useState(false);
  const [isVisible, setIsVisible]                  = useState(false);
  const [imageSrc, setImageSrc]                    = useState(null);

  let imageHolder = null;
  let _isMounted  = useRef(false);

  useEffect(() => {
    _isMounted.current = true;

    return () => {
      _isMounted.current = false;
      if (imageHolder) {
        imageHolder.onload  = null;
        imageHolder.onerror = null;
      }
    };
  }, []);

  useEffect(() => {
    const { src, placeholder } = props;
    if (isVisible) {
      loadImage(src);
    } else {
      setIsLoading(true);
      setImageSrc(placeholder);
    }
  }, [src, placeholder]);

  useEffect(() => {
    const { src } = props;
    if (isVisible) {
      loadImage(src);
    }
  }, [isVisible]);


  useEffect(() => {
    return () => {
      if (imageHolder) {
        imageHolder.onload  = null;
        imageHolder.onerror = null;
      }
    };
  });

  const loadImage = (src) => {
    if (imageHolder) {
      imageHolder.onload  = null;
      imageHolder.onerror = null;
    }

    imageHolder         = new Image();
    imageHolder.onload  = onLoad;
    imageHolder.onerror = onError;
    imageHolder.src     = src;
  };

  const setImageAndState = () => {
    if (_isMounted.current) {
      setIsLoading(false);
      setImageSrc(imageHolder.src);
    }
  };

  const setImageWithDelay = () => {
    setTimeout(() => {
      setImageAndState();
    }, props.delay);
  };

  const onLoad = useCallback(() => {
    if (props.delay) {
      setImageWithDelay();
    } else {
      setImageAndState();
    }
  });


  const onError = useCallback((errorEvent) => {
    const { onError } = props;
    if (onError) {
      onError(errorEvent);
    }
  });


  const handleVisibilityChange = useCallback((inView) => {
    setIsVisible(() => {
      if (isLoading && inView) {
        loadImage(src);
      }
      return inView;
    });
  });

  if (typeof window === 'undefined') return null;

  if (!children || typeof children !== 'function') {
    throw new Error(
      `LazyImage requires a function as its only child`
    );
  }

  if (noLazyLoad) {
    return children(src, false, this.props.srcSetData);
  }

  return (
    <InView onChange={(inView) => handleVisibilityChange(inView)}>
      {({ inView, ref, entry }) => {
        return (
          <Box h={500} ref={ref}>
            {children(imageSrc, isLoading, isVisible)}
          </Box>
        );
      }}
    </InView>
  );
};

