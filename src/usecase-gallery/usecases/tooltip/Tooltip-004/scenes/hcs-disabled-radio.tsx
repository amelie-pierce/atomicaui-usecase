import type { ContextProps } from '../../../../types';
import { Radio, Tooltip, View } from '../../../../kit';

// HCS F01Results (src/components/F01Results.tsx line 296) and FD Results (src/components/Results.jsx line 850): the disabled selection Radio of a failed result row cannot take focus or hover itself, so a focusable span (tabIndex 0,
// `render={<span />}`) wraps it and is the Tooltip.Trigger; the popup is the kit default (surface, scale sm) with the reason. HCS opens it above (top, 4px offset) and FD to the right (right, 10px offset); noted in how.
// Shown open; the scene keeps one row's radio.
export default function HcsDisabledRadioScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 8)', paddingBlockStart: 'calc(var(--p-px-16) * 4)' }}>
      <Tooltip.Provider>
        <Tooltip open>
          <Tooltip.Trigger render={<span />} tabIndex={0} aria-label="Selection unavailable for Model C-300" closeOnClick={false} style={{ display: 'inline-flex' }}>
            <Radio disabled selected={false} tabIndex={-1} aria-label="Model C-300" aui={{ scale: 'sm' }} />
          </Tooltip.Trigger>
          <Tooltip.Portal container={host}>
            <Tooltip.Positioner side="top" sideOffset={4} className="ug-anchored">
              <Tooltip.Popup aui={{ scale: 'sm' }}>Failed products can't be selected. See Why Not for the reason.</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip>
      </Tooltip.Provider>
    </View>
  );
}
