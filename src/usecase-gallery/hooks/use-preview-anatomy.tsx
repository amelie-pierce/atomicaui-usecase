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

function textNodesOf(element: Element) {
  return [...element.childNodes].flatMap((node): Text[] => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) return [node as Text];
    if (node instanceof Element && node.hasAttribute('data-ug-layer-text')) {
      return [...node.childNodes].filter((child): child is Text => child.nodeType === Node.TEXT_NODE && !!child.textContent?.trim());
    }
    return [];
  });
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
  // The overlay lives outside the stage's scroll area and sits over the stage's box, so it is cut to that box:
  // a part larger than the stage (a dialog's scrim) is highlighted only where it is visible.
  const left = Math.max(targetRect.left, stageRect.left);
  const top = Math.max(targetRect.top, stageRect.top);
  const right = Math.min(targetRect.right, stageRect.right);
  const bottom = Math.min(targetRect.bottom, stageRect.bottom);
  if (right <= left || bottom <= top) return null;
  return { left: left - stageRect.left, top: top - stageRect.top, width: right - left, height: bottom - top, radius };
}

/**
 * Highlights the preview element of the part chosen in the documentation. The link is one-way: hovering or focusing the
 * preview never changes the documentation. `fitScale` re-measures the highlight when the content is scaled to fit.
 */
export function usePreviewAnatomy(
  stageRef: RefObject<HTMLElement | null>,
  parts: AnatomyPart[],
  highlightedPartId: string | undefined,
  onAvailablePartsChange?: (partIds: string[]) => void,
  fitScale = 1,
  enabled = true,
) {
  const [overlay, setOverlay] = useState<OverlayRect | null>(null);
  const partTargets = useRef(new Map<string, Element[]>());
  const availablePartIds = useRef<string>();

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage || !enabled) {
      setOverlay(null);
      return;
    }

    availablePartIds.current = undefined;
    const refreshTargets = () => {
      const targets = new Map<string, Element[]>();
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
      }
      partTargets.current = targets;
      const available = parts.filter((part) => (targets.get(part.id)?.length ?? 0) > 0).map((part) => part.id);
      const availableKey = available.join('|');
      if (stage.childElementCount > 0 && availableKey !== availablePartIds.current) {
        availablePartIds.current = availableKey;
        onAvailablePartsChange?.(available);
      }
    };
    refreshTargets();
    // The example is lazy-loaded inside Suspense, so its first DOM commit can happen after the
    // stage's layout effect and before MutationObserver receives a child-list record.
    const delayedRefresh = window.setTimeout(refreshTargets, 100);
    let refreshAttempts = 0;
    const retryRefresh = window.setInterval(() => {
      refreshTargets();
      refreshAttempts += 1;
      if (refreshAttempts >= 10) window.clearInterval(retryRefresh);
    }, 100);
    const observer = new MutationObserver(refreshTargets);
    observer.observe(stage, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      window.clearTimeout(delayedRefresh);
      window.clearInterval(retryRefresh);
      partTargets.current = new Map();
    };
  }, [enabled, onAvailablePartsChange, parts, stageRef]);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage || !enabled || !highlightedPartId) {
      setOverlay(null);
      return;
    }
    const update = () => {
      setOverlay(measure(stage, partTargets.current.get(highlightedPartId)?.[0], !!parts.find((part) => part.id === highlightedPartId)?.text));
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
  }, [enabled, fitScale, highlightedPartId, parts, stageRef]);

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
