import { motion, Variants } from "framer-motion";
import { ReactElement, useMemo } from "react";

interface Props {
  children: ReactElement;
  className?: string;
  variants: Variants;
  step: number;
  onDone?: (id: string) => void;
  onStart?: (id: string) => void;
}

const AnimatedElement: React.FC<Props> = ({
  children,
  className,
  variants,
  step,
  onDone,
  onStart,
}) => {
  const id = useMemo(() => crypto.randomUUID(), []);
  let variationStr: string | false | undefined = false;
  const variation = step === -1 ? undefined : variants[step] ? step : undefined;

  const hasVariantForStep = variation !== undefined;

  if (variation !== undefined) {
    variationStr = `${variation}`;
  }
  if (step === -1) {
    variationStr = undefined;
  }
  console.log("cs", step, variants, variation);

  return (
    <motion.div
      {...(className ? { className } : {})}
      variants={variants}
      animate={variationStr}
      onAnimationStart={() => {
        console.log("a-s", id, hasVariantForStep);
        if (hasVariantForStep && onStart) onStart(id);
      }}
      onAnimationComplete={() => {
        console.log("a-c", id, hasVariantForStep);
        if (hasVariantForStep && onDone) onDone(id);
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedElement;
