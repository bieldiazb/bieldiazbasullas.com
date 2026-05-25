import { useEffect, useState } from "react";

export function useIsMobileDevice() {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    const isSmallScreen = window.innerWidth < 1024;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    setIsMobile(isTouch && isSmallScreen || prefersReducedMotion);
  }, []);

  return isMobile;
}
