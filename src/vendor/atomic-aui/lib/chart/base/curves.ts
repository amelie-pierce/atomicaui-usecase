// modules/design/atomic-aui/src/lib/chart/base/curves.ts
//
// The curve names shared by every cartesian line-like kind (Area, Line): one map from a public name to
// the d3 curve factory, so the kinds cannot drift.
import {
  curveBasis,
  curveBumpX,
  curveCardinal,
  curveCatmullRom,
  curveLinear,
  curveMonotoneX,
  curveNatural,
  curveStep,
  curveStepAfter,
  curveStepBefore,
} from 'd3-shape';

export type ChartCurve =
  | 'linear'
  | 'natural'
  | 'monotone'
  | 'basis'
  | 'cardinal'
  | 'catmull-rom'
  | 'bump'
  | 'step'
  | 'step-before'
  | 'step-after';

export const CHART_CURVES = {
  linear: curveLinear,
  natural: curveNatural,
  monotone: curveMonotoneX,
  basis: curveBasis,
  cardinal: curveCardinal,
  'catmull-rom': curveCatmullRom,
  bump: curveBumpX,
  step: curveStep,
  'step-before': curveStepBefore,
  'step-after': curveStepAfter,
} as const;
