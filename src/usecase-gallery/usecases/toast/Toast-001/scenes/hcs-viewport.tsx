import type { ContextProps } from '../../../../types';
import { Toast, Type, View } from '../../../../kit';
import { useState } from 'react';
import ToastStack from '../toast-stack';

// HCS App (src/App.tsx; the other nine apps mount the same Toast.Provider and a viewport of their own, ADC raises it through createToastManager): one `Toast.Provider` at the app root (timeout 6000, limit 1 in the app; held open and limited to 1 as in the app) and a viewport at the top end of the work area, over a pane.
export default function HcsViewportScene({ host }: ContextProps) {
  const [pane, setPane] = useState<HTMLElement | null>(null);
  return (
    <View ref={setPane} aui={{ paint: 'text', profile: 'no-padding' }} style={{ position: 'relative', minBlockSize: 'calc(var(--p-px-16) * 14)', inlineSize: 'min(100%, calc(var(--p-px-16) * 36))' }}>
      <Type as="h2" role="l3" weight="semi-bold">Input</Type>
      <Toast.Provider timeout={0} limit={1}>
        <ToastStack container={pane ?? host} />
      </Toast.Provider>
    </View>
  );
}
