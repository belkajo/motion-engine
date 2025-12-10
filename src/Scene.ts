import { SceneConfig, Step } from "./types";
import { Variant, Variants } from "framer-motion";

class Scene {
  public scenes: SceneConfig = {};

  public addStep(step: Step) {
    const lastKey = Math.max(...Object.keys(this.scenes).map(Number));
    this.scenes[lastKey + 1] = step;
  }

  public buildVariantsFor(formId: string) {
    const result: Variants = {};
    let lastVariant: Variant | undefined = undefined;

    Object.keys(this.scenes)
      .map((key) => Number(key))
      .sort((a, b) => a - b)
      .forEach((stepNum) => {
        if (!this.scenes[stepNum]) return;
        const configForForm = this.scenes[stepNum][formId];
        if (!configForForm) return;
        if (!lastVariant) {
          lastVariant = { ...(configForForm.variant ?? {}) };
        } else {
          lastVariant = {
            ...lastVariant,
            ...(configForForm.variant ?? {}),
          };
        }

        result[stepNum] = lastVariant;
      });

    return result;
  }

  public buildStatesFor(formId: string) {
    const result: Record<number, any> = {};

    Object.keys(this.scenes)
      .map((key) => Number(key))
      .sort((a, b) => a - b)
      .forEach((key) => {
        const stepNum = Number(key);
        if (!Number.isNaN(stepNum) && this.scenes[stepNum] && this.scenes[stepNum][formId]) {
          result[stepNum] = this.scenes[stepNum][formId]?.state ?? undefined;
        }
      });

    return result;
  }
}

export default Scene;
