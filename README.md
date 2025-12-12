# Motion Engine (Scene + Sequence)

A tiny scene-based animation engine built on top of **framer-motion**. Designed for multi-step UI animations where each UI element evolves through states and coordinated transitions.

> **Status:** Experimental — API may change.

---

## ✨ Features

- **Scene builder (`Scene`)** for structured multi-step animations.
- **Incremental variants**: later steps extend previous animation states.
- **State extraction per step** with `buildStatesFor()`.
- **Sequence controller (`useSequence`)** automatically advances when all animated elements finish.
- **Animated wrapper (`AnimatedElement`)** integrates sequencing with framer-motion.

---

## 📦 Installation

In a pnpm monorepo:

```bash
pnpm add @belkajo/motion-engine --filter <your-app>
```

---

## 🧱 Basic Concepts

### Scene
A Scene consists of numbered animation steps:

```ts
import { Scene } from "@belkajo/motion-engine";

const scene = new Scene()
  .addStep({
    form: {
      variant: { opacity: 0, y: -40 },
      state: {}
    }
  })
  .addStep({
    form: {
      variant: { opacity: 1, y: 0 },
      state: {}
    }
  });
```

### Building variants for an element

```ts
const variants = scene.buildVariantsFor("form");
```

Produces merged variants:

```ts
{
  0: { opacity: 0, y: -40 },
  1: { opacity: 1, y: 0 }
}
```

### Building states

```ts
const states = scene.buildStatesFor("form");
```

---

## 🔁 Using `useSequence`

```ts
import { useSequence } from "@belkajo/motion-engine";

const { currentStep, onStart, onDone, setCurrentStep } = useSequence(scene);
```

- `currentStep` — active animation step
- `setCurrentStep(n)` — manually jump to a step
- `onStart(id)` — mark an element as animating
- `onDone(id)` — mark animation complete and advance step when all finished

---

### 🔄 Resetting and restarting a sequence (important)

Give time to finish the animations after reset before starting the animation scenes.



## 🎬 AnimatedElement

Use instead of `motion.div` to integrate sequencing:

```tsx
<AnimatedElement
  variants={variants}
  step={currentStep}
  onStart={onStart}
  onDone={onDone}
>
  <YourComponent />
</AnimatedElement>
```

**Note on stability**

`AnimatedElement` generates a stable internal `id` (via `useMemo`) which is used by `useSequence`
to track running animations. This is intentional.

Avoid conditionally changing or remounting individual `AnimatedElement`s unless you explicitly
want to cancel their animations.

---

## 🧪 Example Putting It All Together

```tsx
const scene = new Scene()
  .addStep({ form: { variant: { opacity: 0 }, state: {} } })
  .addStep({ form: { variant: { opacity: 1 }, state: {} } });

const variants = scene.buildVariantsFor("form");
const { currentStep, onStart, onDone } = useSequence(scene);

return (
  <AnimatedElement
    variants={variants}
    step={currentStep}
    onStart={onStart}
    onDone={onDone}
  >
    <div>Animated Form</div>
  </AnimatedElement>
);
```

---

## 📘 Types

```ts
interface StepConfig<TState = unknown> {
  variant: Variant;
  state: TState;
}
```

---

## License
MIT
