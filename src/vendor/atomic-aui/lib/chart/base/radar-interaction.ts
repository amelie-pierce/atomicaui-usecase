// modules/design/atomic-aui/src/lib/chart/base/radar-interaction.ts
//
// Framework-neutral radar hover/focus: TWO selectable tooltip modes on top of the rendered radar SVG.
//   • `series` (default): hover a radar line/area → a card for THAT series, one row per axis; the
//     hovered series is emphasised (thicker stroke, stronger fill, dots) and the others dim.
//   • `axis` (compare): hover an axis (spoke/vertex/its sector) → a card for that AXIS, one row per
//     series (optionally sorted + a delta vs the leader or the average); every series' dot on that
//     axis is highlighted at once.
// The pure functions (content, geometry, placement) are testable without a DOM. `attachRadarInteraction`
// is the DOM controller: it reads vertex positions from the series paths the library draws, owns pointer
// + keyboard (arrows move, Escape closes) and the SVG emphasis, and reports a plain state object; the
// host renders the card (React part, or any DOM — see the neutral example). No React, no layout of its own.
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ChartTooltipContent, ChartTooltipRow } from './common';

export type RadarTooltipMode = 'series' | 'axis';
export type RadarDelta = 'leader' | 'average';

export interface RadarInteractionSeries {
  key: string;
  label: string;
  color: string;
}

export interface RadarInteractionOptions {
  mode?: RadarTooltipMode;
  categoryKey: string;
  data: readonly Record<string, unknown>[];
  /** The VISIBLE series (hidden ones are simply not passed). */
  series: readonly RadarInteractionSeries[];
  /** Value formatter for the rows (default: locale string). */
  format?: (value: number) => string;
  /** Axis mode: order rows by value, highest first (default true). */
  sort?: boolean;
  /** Axis mode: a muted secondary value — the difference to the leader or to the average (off by default). */
  delta?: RadarDelta;
  /** Replace the default content (data in → data out). */
  content?: (content: ChartTooltipContent) => ChartTooltipContent;
  /** Distance in px from a series outline that still counts as hovering it (default 18). */
  hitRadius?: number;
}

export interface RadarTarget {
  /** Series key (series mode). */
  series?: string;
  /** Axis index into `data` (axis mode). */
  axis?: number;
}

export interface RadarInteractionState {
  mode: RadarTooltipMode;
  target: RadarTarget;
  content: ChartTooltipContent;
  /** Where to anchor the card, in px relative to the plot element (the hovered point). */
  anchor: { x: number; y: number };
  /** Plain-text equivalent for an aria-live region. */
  text: string;
}

const defaultFormat = (v: number) => v.toLocaleString();

/** Tooltip content for a target — pure. Series mode: one row per axis; axis mode: one row per series. */
export function radarTooltipContent(options: RadarInteractionOptions, target: RadarTarget): ChartTooltipContent {
  const { mode = 'series', categoryKey, data, series, format = defaultFormat, sort = true, delta } = options;
  let out: ChartTooltipContent;
  if (mode === 'series') {
    const s = series.find((x) => x.key === target.series);
    out = {
      title: s?.label ?? '',
      rows: data.map((row) => ({ label: String(row[categoryKey]), value: format(Number(row[s?.key ?? '']) || 0), color: s?.color })),
    };
  } else {
    const row = data[target.axis ?? 0] ?? {};
    const raw = series.map((s) => ({ s, v: Number(row[s.key]) || 0 }));
    if (sort) raw.sort((a, b) => b.v - a.v);
    const leader = Math.max(0, ...raw.map((r) => r.v));
    const average = raw.length ? raw.reduce((sum, r) => sum + r.v, 0) / raw.length : 0;
    const secondary = (v: number): string | undefined => {
      if (!delta) return undefined;
      const d = v - (delta === 'leader' ? leader : average);
      return `${d > 0 ? '+' : d < 0 ? '−' : '±'}${format(Math.abs(Math.round(d * 100) / 100))}`;
    };
    out = {
      title: String(row[categoryKey] ?? ''),
      rows: raw.map<ChartTooltipRow>(({ s, v }) => ({ label: s.label, value: format(v), color: s.color, secondary: secondary(v) })),
    };
  }
  return options.content ? options.content(out) : out;
}

/** The aria-live text of a card: `Desktop: JavaScript 186, TypeScript 305, …`. */
export function radarTooltipText(content: ChartTooltipContent): string {
  return `${content.title ?? ''}: ${content.rows.map((r) => `${r.label} ${r.value}${r.secondary ? ` (${r.secondary})` : ''}`).join(', ')}`;
}

/** Place a card next to an anchor point so it never covers it and never leaves the bounds (flip + shift) — pure. */
export function placeTooltip(
  anchor: { x: number; y: number },
  card: { width: number; height: number },
  bounds: { width: number; height: number },
  gap = 14,
): { x: number; y: number; side: 'left' | 'right' } {
  let side: 'left' | 'right' = 'right';
  let x = anchor.x + gap;
  if (x + card.width > bounds.width) {
    side = 'left';
    x = anchor.x - gap - card.width;
  }
  x = Math.max(0, Math.min(x, Math.max(0, bounds.width - card.width)));
  // Vertically centred on the point, shifted to stay inside.
  const y = Math.max(0, Math.min(anchor.y - card.height / 2, Math.max(0, bounds.height - card.height)));
  return { x, y, side };
}

type Pt = { x: number; y: number };

/** Vertex coordinates of a closed `M x,y L x,y … Z` path (what the library draws for a radar series). */
export function parseRadarVertices(d: string): Pt[] {
  const nums = (d.match(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi) ?? []).map(Number);
  const pts: Pt[] = [];
  for (let i = 0; i + 1 < nums.length; i += 2) pts.push({ x: nums[i], y: nums[i + 1] });
  return pts;
}

function segmentDistance(p: Pt, a: Pt, b: Pt): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len2 = dx * dx + dy * dy;
  const t = len2 === 0 ? 0 : Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2));
  return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
}

function inside(p: Pt, poly: readonly Pt[]): boolean {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i];
    const b = poly[j];
    if (a.y > p.y !== b.y > p.y && p.x < ((b.x - a.x) * (p.y - a.y)) / (b.y - a.y) + a.x) hit = !hit;
  }
  return hit;
}

/** Series mode hit-test: the series whose outline is nearest the point, if the point is on/in it. */
export function nearestRadarSeries(p: Pt, polygons: Record<string, readonly Pt[]>, hitRadius = 18): string | undefined {
  let best: { key: string; dist: number } | undefined;
  for (const [key, poly] of Object.entries(polygons)) {
    if (poly.length < 2) continue;
    let dist = Infinity;
    for (let i = 0; i < poly.length; i++) dist = Math.min(dist, segmentDistance(p, poly[i], poly[(i + 1) % poly.length]));
    if (dist > hitRadius && !inside(p, poly)) continue;
    if (!best || dist < best.dist) best = { key, dist };
  }
  return best?.key;
}

/** Axis mode hit-test: the axis whose spoke is angularly nearest the point (axes start at the top, clockwise). */
export function nearestRadarAxis(p: Pt, count: number): number | undefined {
  if (count < 1 || (p.x === 0 && p.y === 0)) return count > 0 ? 0 : undefined;
  const theta = (Math.atan2(p.x, -p.y) + 2 * Math.PI) % (2 * Math.PI);
  return Math.round(theta / ((2 * Math.PI) / count)) % count;
}

/** Spoke direction of axis `i` of `n` (top, clockwise). */
function spoke(i: number, n: number): Pt {
  const t = (2 * Math.PI * i) / n;
  return { x: Math.sin(t), y: -Math.cos(t) };
}

const SVG_NS = 'http://www.w3.org/2000/svg';
const MARK = 'data-aui-radar-hl';

export interface RadarInteraction {
  /** Move the target programmatically (the keyboard uses this). `undefined` clears. */
  setTarget(target: RadarTarget | undefined): void;
  /** Re-read the series paths (call after the chart re-rendered with new data). */
  refresh(): void;
  destroy(): void;
}

/** Attach the radar hover/focus behaviour to the plot element that holds the chart SVG. */
export function attachRadarInteraction(
  plot: object,
  getOptions: () => RadarInteractionOptions,
  onChange: (state: RadarInteractionState | null) => void,
): RadarInteraction {
  const el = plot as any;
  let target: RadarTarget | undefined;
  const svg = () => el.querySelector('svg') as any;
  const polar = () => svg()?.querySelector('g.ts-chart__polar') as any;

  const polygons = (): Record<string, Pt[]> => {
    const out: Record<string, Pt[]> = {};
    for (const s of getOptions().series) {
      const path = polar()?.querySelector(`g[data-ts-key="radar-${s.key}"] path`);
      const d = path?.getAttribute('d');
      // The area path also runs back along the radius-0 baseline (every point at the centre): keep one vertex per axis.
      if (d) out[s.key] = parseRadarVertices(d).slice(0, getOptions().data.length);
    }
    return out;
  };
  const outerRadius = (): number => {
    const rings = [...(polar()?.querySelectorAll('g.ts-chart__radial-grid path') ?? [])] as any[];
    const d = rings[rings.length - 1]?.getAttribute('d');
    const first = d ? parseRadarVertices(d)[0] : undefined;
    return first ? Math.hypot(first.x, first.y) : 0;
  };

  // Local (polar-group) ↔ plot-relative px, through the SVG's own transform.
  const toLocal = (clientX: number, clientY: number): Pt | undefined => {
    const g = polar();
    const ctm = g?.getScreenCTM?.();
    const root = svg();
    if (!ctm || !root?.createSVGPoint) return undefined;
    const pt = root.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const local = pt.matrixTransform(ctm.inverse());
    return { x: local.x, y: local.y };
  };
  const toPlot = (local: Pt): Pt => {
    const g = polar();
    const ctm = g?.getScreenCTM?.();
    const root = svg();
    const rect = el.getBoundingClientRect();
    if (!ctm || !root?.createSVGPoint) return { x: rect.width / 2, y: rect.height / 2 };
    const pt = root.createSVGPoint();
    pt.x = local.x;
    pt.y = local.y;
    const c = pt.matrixTransform(ctm);
    return { x: c.x - rect.left, y: c.y - rect.top };
  };

  const clearMarks = () => {
    el.querySelectorAll(`[${MARK}]`).forEach((n: any) => n.remove());
    el.querySelectorAll('g[data-ts-key^="radar-"]').forEach((g: any) => {
      g.style.removeProperty('opacity');
      const p = g.querySelector('path');
      p?.style.removeProperty('stroke-width');
      p?.style.removeProperty('fill-opacity');
    });
  };
  const addDot = (g: any, at: Pt, color: string, r: number) => {
    const c = el.ownerDocument.createElementNS(SVG_NS, 'circle');
    c.setAttribute(MARK, '');
    c.setAttribute('cx', String(at.x));
    c.setAttribute('cy', String(at.y));
    c.setAttribute('r', String(r));
    c.setAttribute('fill', color);
    c.setAttribute('stroke', 'var(--theme-surface, white)');
    c.setAttribute('stroke-width', '2');
    c.setAttribute('pointer-events', 'none');
    g.appendChild(c);
  };

  const emphasise = (t: RadarTarget, polys: Record<string, Pt[]>) => {
    clearMarks();
    const o = getOptions();
    const g = polar();
    if (!g) return;
    if ((o.mode ?? 'series') === 'series') {
      for (const s of o.series) {
        const grp = g.querySelector(`g[data-ts-key="radar-${s.key}"]`);
        if (!grp) continue;
        const path = grp.querySelector('path');
        if (s.key === t.series) {
          path?.style.setProperty('stroke-width', String((Number(path.getAttribute('stroke-width')) || 1) * 2));
          path?.style.setProperty('fill-opacity', '0.5');
          (polys[s.key] ?? []).forEach((v) => addDot(g, v, s.color, 4));
        } else grp.style.setProperty('opacity', '0.3');
      }
    } else {
      const n = o.data.length;
      const i = t.axis ?? 0;
      const R = outerRadius();
      const dir = spoke(i, n);
      if (R) {
        const line = el.ownerDocument.createElementNS(SVG_NS, 'line');
        line.setAttribute(MARK, '');
        line.setAttribute('x1', '0');
        line.setAttribute('y1', '0');
        line.setAttribute('x2', String(dir.x * R));
        line.setAttribute('y2', String(dir.y * R));
        line.setAttribute('stroke', 'currentColor');
        line.setAttribute('stroke-opacity', '0.45');
        line.setAttribute('stroke-width', '2');
        line.setAttribute('pointer-events', 'none');
        g.appendChild(line);
      }
      for (const s of o.series) {
        const v = polys[s.key]?.[i];
        if (v) addDot(g, v, s.color, 5);
      }
    }
  };

  const anchorFor = (t: RadarTarget, polys: Record<string, Pt[]>): Pt => {
    const o = getOptions();
    if ((o.mode ?? 'series') === 'axis') {
      const i = t.axis ?? 0;
      const verts = o.series.map((s) => polys[s.key]?.[i]).filter(Boolean) as Pt[];
      const far = verts.sort((a, b) => Math.hypot(b.x, b.y) - Math.hypot(a.x, a.y))[0] ?? { x: 0, y: 0 };
      return toPlot(far);
    }
    const poly = polys[t.series ?? ''] ?? [];
    const far = [...poly].sort((a, b) => Math.hypot(b.x, b.y) - Math.hypot(a.x, a.y))[0] ?? { x: 0, y: 0 };
    return toPlot(far);
  };

  const publish = (anchorOverride?: Pt) => {
    if (!target) {
      clearMarks();
      onChange(null);
      return;
    }
    const o = getOptions();
    const polys = polygons();
    emphasise(target, polys);
    const content = radarTooltipContent(o, target);
    onChange({
      mode: o.mode ?? 'series',
      target,
      content,
      anchor: anchorOverride ?? anchorFor(target, polys),
      text: radarTooltipText(content),
    });
  };

  const sameTarget = (a?: RadarTarget, b?: RadarTarget) => a?.series === b?.series && a?.axis === b?.axis;

  const onMove = (e: any) => {
    const o = getOptions();
    const local = toLocal(e.clientX, e.clientY);
    if (!local) return;
    let next: RadarTarget | undefined;
    if ((o.mode ?? 'series') === 'series') {
      const key = nearestRadarSeries(local, polygons(), o.hitRadius);
      next = key ? { series: key } : undefined;
    } else {
      const R = outerRadius();
      const axis = R && Math.hypot(local.x, local.y) <= R * 1.35 ? nearestRadarAxis(local, o.data.length) : undefined;
      next = axis === undefined ? undefined : { axis };
    }
    const rect = el.getBoundingClientRect();
    const pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    if (!next) {
      if (target) {
        target = undefined;
        publish();
      }
      return;
    }
    const changed = !sameTarget(target, next);
    target = next;
    // Series mode follows the pointer (the card sits beside it); axis mode anchors to the axis' dots.
    if ((o.mode ?? 'series') === 'series') publish(pointer);
    else if (changed) publish();
  };
  const onLeave = () => {
    if (!target) return;
    target = undefined;
    publish();
  };

  const onKey = (e: any) => {
    const o = getOptions();
    if (e.key === 'Escape') {
      if (target) {
        target = undefined;
        publish();
        e.preventDefault();
      }
      return;
    }
    const forward = e.key === 'ArrowRight' || e.key === 'ArrowDown';
    const backward = e.key === 'ArrowLeft' || e.key === 'ArrowUp';
    if (!forward && !backward) return;
    const step = forward ? 1 : -1;
    if ((o.mode ?? 'series') === 'series') {
      const keys = o.series.map((s) => s.key);
      if (!keys.length) return;
      const at = keys.indexOf(target?.series ?? '');
      target = { series: keys[(at + step + keys.length) % keys.length] };
    } else {
      const n = o.data.length;
      if (!n) return;
      target = { axis: ((target?.axis ?? (step > 0 ? -1 : 0)) + step + n) % n };
    }
    e.preventDefault();
    publish();
  };
  const onBlur = () => onLeave();

  el.addEventListener('pointermove', onMove);
  el.addEventListener('pointerleave', onLeave);
  el.addEventListener('keydown', onKey);
  el.addEventListener('focusout', onBlur);

  return {
    setTarget(next) {
      target = next;
      publish();
    },
    refresh() {
      if (target) publish();
    },
    destroy() {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('keydown', onKey);
      el.removeEventListener('focusout', onBlur);
      clearMarks();
    },
  };
}
