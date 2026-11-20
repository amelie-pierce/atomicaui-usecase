import { useEffect } from 'react';
import { Toast, useToastManager } from '../../../kit';

// The app's viewport sink (HCS App.tsx ToastViewport): the viewport pins the stack to the top end of its container and renders one Toast per manager entry. The effect stands in for the app calling `manager.add(...)` after an action; the viewport is the part users copy (see how).
export default function ToastStack({ container }: { container: HTMLElement | null }) {
  const manager = useToastManager();
  useEffect(() => {
    manager.add({ title: 'Success', description: 'Your project was saved to the device.', type: 'success' });
    // Added once on mount, like the toast an action raises.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!container) return null;
  return (
    <Toast.Portal container={container} style={{ display: 'contents' }}>
      <Toast.Viewport style={{ position: 'absolute', insetBlockStart: 'var(--p-px-8)', insetInlineEnd: 'var(--p-px-8)', maxInlineSize: 'calc(100% - var(--p-px-16))' }}>
        {manager.toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} />
        ))}
      </Toast.Viewport>
    </Toast.Portal>
  );
}
