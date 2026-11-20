import { Toast } from '../../../kit';
import { useStageHost } from '../../../hooks/use-stage-host';
import ToastStack from './toast-stack';

export default function Example() {
  const host = useStageHost();
  return (
    <Toast.Provider timeout={0} limit={1}>
      <ToastStack container={host} />
    </Toast.Provider>
  );
}
