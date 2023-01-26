import { RefObject, useEffect, useState } from "react";

// source: https://www.30secondsofcode.org/react/s/use-intersection-observer

export const useIntersectionObserver = (
  ref: RefObject<Element>,
  options: IntersectionObserverInit = { threshold: 0.8 }
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return isIntersecting;
};
