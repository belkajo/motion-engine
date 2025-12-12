import { useEffect, useState } from "react";

interface ResponsiveScaleRule {
  maxWidth: number;
  scale: number;
}

const defaultRules: ResponsiveScaleRule[] = [
  { maxWidth: 480, scale: 0.55 }, // small phones
  { maxWidth: 640, scale: 0.65 }, // large phones
  { maxWidth: 768, scale: 0.75 }, // tablets portrait
  { maxWidth: 1024, scale: 0.85 }, // tablets landscape / small laptops
];
const useResponsiveScale = (
  rules: ResponsiveScaleRule[] = defaultRules,
  defaultScale: number = 1,
) => {
  let frame: number;
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const sortedRules = [...rules].sort((a, b) => a.maxWidth - b.maxWidth);

    function update() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const width = window.innerWidth;

        const matched = sortedRules.find((rule) => width < rule.maxWidth);

        setScale(matched ? matched.scale : defaultScale);
      });
    }

    update();
    window.addEventListener("resize", update, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
    };
  }, [rules, defaultScale]);

  return { scale };
};

export { useResponsiveScale };
