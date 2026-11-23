import { useLayoutEffect, useRef, useState, type RefObject } from 'react';
import type { AnatomyPart } from '../types';

interface OverlayRect {
  left: number;
  top: number;
  width: number;
  height: number;
  radius: string;
}

type PartChangeSource = 'hover' | 'focus';

function selectorFor(part: AnatomyPart) {
  return part.selector ?? `[data-ug-part="${CSS.escape(part.id)}"]`;
}

function textNodesOf(element: Element) {
  return [...element.childNodes].filter((node): node is Text => node.nodeType === Node.TEXT_NODE && !!node.textContent?.trim());
}

function textRectContains(element: Element, event: PointerEvent) {
  const nodes = textNodesOf(element);
  if (!nodes.length) return false;
  const range = document.createRange();
  range.setStartBefore(nodes[0]);
  range.setEndAfter(nodes[nodes.length - 1]);
  return [...range.getClientRects()].some((rect) => event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom);
}

function isAnatomyTarget(target: EventTarget | null): target is Element {
  return target instanceof Element && !!target.closest('.ug-docs__anatomy-button');
}

function nearestPart(target: EventTarget | null, stage: HTMLElement, bindings: Map<Element, AnatomyPart[]>, pointer?: PointerEvent) {
  let element = target instanceof Element ? target : null;
  while (element && element !== stage) {
    const parts = bindings.get(element);
    if (parts?.length) {
      const textPart = pointer && parts.find((part) => part.text && textRectContains(element, pointer));
      const part = textPart ?? parts.find((candidate) => !candidate.text) ?? parts[0];
      return { element, part };
    }
    element = element.parentElement;
  }
  return undefined;
}

function measure(stage: HTMLElement, target: Element | undefined, textOnly: boolean): OverlayRect | null {
  if (!target) return null;
  let targetRect: DOMRect;
  if (textOnly) {
    const nodes = textNodesOf(target);
    if (!nodes.length) return null;
    const range = document.createRange();
    range.setStartBefore(nodes[0]);
    range.setEndAfter(nodes[nodes.length - 1]);
    targetRect = range.getBoundingClientRect();
  } else {
    targetRect = target.getBoundingClientRect();
  }
  const stageRect = stage.getBoundingClientRect();
  if (!targetRect.width || !targetRect.height) return null;
  const radius = textOnly ? '2px' : getComputedStyle(target).borderRadius || '0px';
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
  onPartChange: (partId: string | undefined, expectedPartId?: string, source?: PartChangeSource) => void,
  onAvailablePartsChange?: (partIds: string[]) => void,
) {
  const [overlay, setOverlay] = useState<OverlayRect | null>(null);
  const activeElement = useRef<Element | undefined>(undefined);
  const activePartId = useRef<string>();
  const activePartSource = useRef<PartChangeSource>();
  const partTargets = useRef(new Map<string, Element[]>());
  const availablePartIds = useRef<string>();

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const bindings = new Map<Element, AnatomyPart[]>();
    const targets = new Map<string, Element[]>();
    availablePartIds.current = undefined;
    const refreshBindings = () => {
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
        if (part.text) elements = elements.filter((element) => textNodesOf(element).length > 0);
        targets.set(part.id, elements);
        for (const element of elements) {
          bindings.set(element, [...(bindings.get(element) ?? []), part]);
          if (!part.text && !element.hasAttribute('data-ug-anatomy-part')) element.setAttribute('data-ug-anatomy-part', part.id);
        }
      }
      const available = parts.filter((part) => (targets.get(part.id)?.length ?? 0) > 0).map((part) => part.id);
      const availableKey = available.join('|');
      if (stage.childElementCount > 0 && availableKey !== availablePartIds.current) {
        availablePartIds.current = availableKey;
        onAvailablePartsChange?.(available);
      }
      partTargets.current = targets;
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

    const clearActivePart = (source: PartChangeSource) => {
      if (activePartSource.current !== source) {
        onPartChange(undefined, undefined, source);
        return;
      }
      const previousPartId = activePartId.current;
      activeElement.current = undefined;
      activePartId.current = undefined;
      activePartSource.current = undefined;
      onPartChange(undefined, previousPartId, source);
    };
    const setFromTarget = (target: EventTarget | null, source: PartChangeSource, pointer?: PointerEvent) => {
      const match = nearestPart(target, stage, bindings, pointer);
      if (match) {
        activeElement.current = match.element;
        activePartId.current = match.part.id;
        activePartSource.current = source;
        onPartChange(match.part.id, undefined, source);
        return true;
      }
      clearActivePart(source);
      return false;
    };
    const onPointerOver = (event: PointerEvent) => setFromTarget(event.target, 'hover', event);
    const onPointerOut = (event: PointerEvent) => {
      if (isAnatomyTarget(event.relatedTarget)) return;
      if (!event.relatedTarget || !(event.relatedTarget instanceof Node) || !stage.contains(event.relatedTarget)) return clearActivePart('hover');
      setFromTarget(event.relatedTarget, 'hover', event);
    };
    const onFocusIn = (event: FocusEvent) => setFromTarget(event.target, 'focus');
    const onFocusOut = (event: FocusEvent) => {
      if (isAnatomyTarget(event.relatedTarget)) return;
      if (!event.relatedTarget || !(event.relatedTarget instanceof Node) || !stage.contains(event.relatedTarget)) return clearActivePart('focus');
      setFromTarget(event.relatedTarget, 'focus');
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
      activeElement.current = undefined;
      activePartId.current = undefined;
      activePartSource.current = undefined;
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
      setOverlay(measure(stage, target, !!parts.find((part) => part.id === highlightedPartId)?.text));
    };
    update();
    const resize = new ResizeObserver(update);
    const mutation = new MutationObserver(update);
    resize.observe(stage);
    for (const target of partTargets.current.get(highlightedPartId) ?? []) resize.observe(target);
    mutation.observe(stage, { childList: true, subtree: true, characterData: true });
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

