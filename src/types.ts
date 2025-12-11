import { Variant } from "framer-motion";

interface StepConfig<TState = unknown> {
  variant: Variant;
  state: TState;
}

type Step<TState = unknown> = Record<string, StepConfig<TState>>;

type SceneConfig<TState = unknown> = Record<number, Step<TState>>;

export type { SceneConfig, Step, StepConfig };
