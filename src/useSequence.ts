import { useCallback, useRef, useState } from "react";
import Scene from "./Scene";

const useSequence = (scene: Scene) => {
  const isAnimating = useRef<Record<string, boolean>>({});
  const [currentStep, setCurrentStep] = useState<number>(-1);

  const onStart = useCallback((id: string) => {
    isAnimating.current[id] = true;
  }, []);

  const onDone = useCallback((id: string) => {
    isAnimating.current[id] = false;
    const anyAnimating = Object.values(isAnimating.current).some(Boolean);
    if (!anyAnimating) {
      setCurrentStep((prev) => (prev >= 0 && scene.scenes[prev + 1] ? prev + 1 : prev));
    }
  }, []);

  return {
    setCurrentStep,
    currentStep,
    onStart,
    onDone,
  };
};

export { useSequence };
