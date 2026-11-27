import { useEffect, useRef } from 'react';
import { Button, IconButton } from '../kit';
import type { LayerStep } from '../types';

export function LayerStepper({ layers, index, onChange }: { layers: LayerStep[]; index: number; onChange: (index: number) => void }) {
  const stepsRef = useRef<HTMLElement>(null);
  const focusAfterChange = useRef(false);

  useEffect(() => {
    const nav = stepsRef.current;
    const active = nav?.querySelector<HTMLElement>('[aria-current="step"]');
    if (!nav || !active) return;
    const left = active.offsetLeft;
    const right = left + active.offsetWidth;
    const scrollTo = (nextLeft: number) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) nav.scrollLeft = nextLeft;
      else nav.scrollTo({ left: nextLeft, behavior: 'smooth' });
    };
    if (left < nav.scrollLeft) scrollTo(left);
    else if (right > nav.scrollLeft + nav.clientWidth) scrollTo(right - nav.clientWidth);
    if (focusAfterChange.current) {
      focusAfterChange.current = false;
      active.focus();
    }
  }, [index]);

  const onStepKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? layers.length - 1
      : Math.max(0, Math.min(layers.length - 1, index + (event.key === 'ArrowRight' ? 1 : -1)));
    if (next === index) return;
    focusAfterChange.current = true;
    onChange(next);
  };

  return <section className="ug-stepper" aria-label="Layer step controls">
    <IconButton className="ug-stepper__back" name="arrow-left" aria-label="Previous step" aui={{ color: 'secondary', paint: 'outlined', scale: 'sm' }} disabled={index === 0} onClick={() => onChange(Math.max(index - 1, 0))} />
    <nav className="ug-stepper__steps" aria-label="Layer steps" ref={stepsRef} onKeyDown={onStepKeyDown}>
      {layers.map((step, stepIndex) => {
        const state = stepIndex === index ? 'active' : stepIndex < index ? 'completed' : 'upcoming';
        return <Button
          key={step.id}
          className={`ug-stepper__step is-${state}`}
          aui={{ color: state === 'active' ? 'primary' : 'secondary', paint: state === 'active' ? 'solid' : 'outlined', scale: 'sm' }}
          aria-current={state === 'active' ? 'step' : undefined}
          aria-label={`Step ${stepIndex + 1}: ${step.title}${state === 'active' ? ', current step' : ''}`}
          data-state={state}
          data-step-index={stepIndex}
          data-ug-layer-id={step.id}
          data-ug-layer-selector={step.selector ?? `[data-ug-part="${step.id}"]`}
          data-ug-layer-scope={step.scope ?? 'component'}
          tabIndex={state === 'active' ? 0 : -1}
          onClick={() => onChange(stepIndex)}
        >{stepIndex + 1}</Button>;
      })}
    </nav>
    <IconButton className="ug-stepper__next" name="arrow-right" aria-label="Next step" aui={{ color: 'primary', paint: 'solid', scale: 'sm' }} disabled={index === layers.length - 1} onClick={() => onChange(Math.min(index + 1, layers.length - 1))} />
  </section>;
}
