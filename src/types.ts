import { Variant } from "framer-motion";

export interface StepConfig {
  variant: Variant;
  state: any;
}

type Step = Record<string, StepConfig>;

type SceneConfig = Record<number, Step>;

export type { SceneConfig, Step };
