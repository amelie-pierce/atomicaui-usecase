import { useLayoutEffect, useRef, useState, type RefObject } from 'react';
import type { AnatomyPart } from '../types';

interface OverlayRect {
  left: number;
  top: number;
  width: number;
  height: number;
  radius: string;
}

function selectorFor(part: AnatomyPart) {
  return part.selector ?? `[data-ug-part="${CSS.escape(part.id)}"]`;
}

/**
 * Button renders plain label children directly in its host element. Give those text nodes a real,
 * preview-only element so the label can be highlighted independently from the button surface and
 * its icon. Existing element children (for example a Type or a custom label span) get the same
 * marker; AtomicAUI-owned icon/spinner parts stay separate.
 */
function markButtonLabels(stage: HTMLElement) {
  for (const button of stage.querySelectorAll<HTMLElement>('[class~="aui-button"]')) {
    for (const node of [...button.childNodes]) {
      if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        const label = document.createElement('span');
        label.setAttribute('data-ug-anatomy-label', 'button');
        label.textContent = node.textContent;
        node.replaceWith(label);
        continue;
      }
      if (node instanceof HTMLElement &&
          !node.matches('[class~="aui-contained-icon"], [class~="aui-icon"], [class~="aui-spinner"]') &&
          node.textContent?.trim()) {
        node.setAttribute('data-ug-anatomy-label', 'button');
      }
    }
  }
}

function nearestPart(target: EventTarget | null, stage: HTMLElement, bindings: Map<Element, AnatomyPart>) {
  let element = target instanceof Element ? target : null;
  while (element && element !== stage) {
    const part = bindings.get(element);
    if (part) return { element, part };
    element = element.parentElement;
  }
  return undefined;
}

function measure(stage: HTMLElement, target: Element | undefined): OverlayRect | null {
  if (!target) return null;
  const targetRect = target.getBoundingClientRect();
  const stageRect = stage.getBoundingClientRect();
  if (!targetRect.width || !targetRect.height) return null;
  const radius = getComputedStyle(target).borderRadius || '0px';
  return {
    left: targetRect.left - stageRect.left + stage.scrollLeft,
    top: targetRect.top - stageRect.top + stage.scrollTop,
    width: targetRect.width,
    height: targetRect.height,
    radius,
  };
}

/** Connects marker-backed preview parts to the documentation without changing the component DOM or layout. */
export function usePreviewAnatomy(
  stageRef: RefObject<HTMLElement | null>,
  parts: AnatomyPart[],
  highlightedPartId: string | undefined,
  onPartChange: (partId: string | undefined) => void,
  onAvailablePartsChange?: (partIds: string[]) => void,
) {
  const [overlay, setOverlay] = useState<OverlayRect | null>(null);
  const activeElement = useRef<Element | undefined>(undefined);
  const partTargets = useRef(new Map<string, Element[]>());
  const availablePartIds = useRef<string>();

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const bindings = new Map<Element, AnatomyPart>();
    const targets = new Map<string, Element[]>();
    availablePartIds.current = undefined;
    const refreshBindings = () => {
      markButtonLabels(stage);
      for (const element of bindings.keys()) element.removeAttribute('data-ug-anatomy-part');
      bindings.clear();
      targets.clear();
      for (const part of parts) {
        let elements: Element[] = [];
        try {
          elements = [...stage.querySelectorAll(selectorFor(part))];
        } catch {
          // A malformed optional selector should not make a preview unusable.
          elements = [];
        }
        targets.set(part.id, elements);
        for (const element of elements) {
          bindings.set(element, part);
          element.setAttribute('data-ug-anatomy-part', part.id);
        }
      }
      const available = parts.filter((part) => (targets.get(part.id)?.length ?? 0) > 0).map((part) => part.id);
      const availableKey = available.join('|');
      // Suspense can leave the stage empty for the first pass. Keep the docs visible until the
      // actual preview mounts; every default anatomy has a required root part, so a non-empty set
      // is the first reliable availability snapshot.
      if (available.length > 0 && availableKey !== availablePartIds.current) {
        availablePartIds.current = availableKey;
        onAvailablePartsChange?.(available);
      }
    };
    refreshBindings();
    // The example is lazy-loaded inside Suspense, so its first DOM commit can happen after the
    // stage's layout effect and before MutationObserver receives a child-list record.
    const delayedRefresh = window.setTimeout(refreshBindings, 100);
    let refreshAttempts = 0;
    const retryRefresh = window.setInterval(() => {
      refreshBindings();
      refreshAttempts += 1;
      if (refreshAttempts >= 10) window.clearInterval(retryRefresh);
    }, 100);
    partTargets.current = targets;

    const setFromTarget = (target: EventTarget | null) => {
      const match = nearestPart(target, stage, bindings);
      if (match) {
        activeElement.current = match.element;
        onPartChange(match.part.id);
      }
    };
    const onPointerOver = (event: PointerEvent) => setFromTarget(event.target);
    const onPointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget || !(event.relatedTarget instanceof Node) || !stage.contains(event.relatedTarget)) {
        activeElement.current = undefined;
        onPartChange(undefined);
      } else {
        setFromTarget(event.relatedTarget);
      }
    };
    const onFocusIn = (event: FocusEvent) => setFromTarget(event.target);
    const onFocusOut = (event: FocusEvent) => {
      if (!event.relatedTarget || !(event.relatedTarget instanceof Node) || !stage.contains(event.relatedTarget)) {
        activeElement.current = undefined;
        onPartChange(undefined);
      }
    };
    stage.addEventListener('pointerover', onPointerOver);
    stage.addEventListener('pointerout', onPointerOut);
    stage.addEventListener('focusin', onFocusIn);
    stage.addEventListener('focusout', onFocusOut);
    const observer = new MutationObserver(refreshBindings);
    observer.observe(stage, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      window.clearTimeout(delayedRefresh);
      window.clearInterval(retryRefresh);
      stage.removeEventListener('pointerover', onPointerOver);
      stage.removeEventListener('pointerout', onPointerOut);
      stage.removeEventListener('focusin', onFocusIn);
      stage.removeEventListener('focusout', onFocusOut);
      for (const element of bindings.keys()) element.removeAttribute('data-ug-anatomy-part');
      partTargets.current = new Map();
    };
  }, [onAvailablePartsChange, onPartChange, parts, stageRef]);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage || !highlightedPartId) {
      setOverlay(null);
      return;
    }
    const update = () => {
      const target = activeElement.current && partTargets.current.get(highlightedPartId)?.includes(activeElement.current)
        ? activeElement.current
        : partTargets.current.get(highlightedPartId)?.[0];
      setOverlay(measure(stage, target));
    };
    update();
    const resize = new ResizeObserver(update);
    const mutation = new MutationObserver(update);
    resize.observe(stage);
    const target = partTargets.current.get(highlightedPartId)?.[0];
    if (target) resize.observe(target);
    mutation.observe(stage, { childList: true, subtree: true });
    stage.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      resize.disconnect();
      mutation.disconnect();
      stage.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [highlightedPartId, parts, stageRef]);

  return overlay;
}

export function AnatomyOverlay({ rect }: { rect: OverlayRect | null }) {
  if (!rect) return null;
  return (
    <span
      aria-hidden="true"
      className="ug-anatomy-overlay"
      style={{
        insetInlineStart: rect.left,
        insetBlockStart: rect.top,
        inlineSize: rect.width,
        blockSize: rect.height,
        borderRadius: rect.radius,
      }}
    />
  );
}

