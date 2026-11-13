// modules/design/atomic-aui/src/core/use-state-layer.ts
// Shared prop-hook: marks a component as an interactive state-layer host and
// pins the focus ring tokens. Every interactive AtomicAUI component wants the
// same host, so this lives in core/. Returns static classes → JSDOM-testable.
// The drawing happens in _state-cascade.scss.
import type { PropHook } from '../types';

const STATE_LAYER_CLASSES = 'aui-stateful aui-focus-color-info aui-focus-width-2';

export const useStateLayer: PropHook<{ className?: string }, { className: string }> = ({ className }) => ({
  className: [className, STATE_LAYER_CLASSES].filter(Boolean).join(' '),
});
