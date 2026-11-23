import { useEffect, useRef, useState } from 'react';
import { useCopy } from '../hooks/use-copy';
import { Button } from '../kit';
import type { Crumb } from './breadcrumb';
import { Breadcrumb } from './breadcrumb';
import type { PreviewMode, Usecase, UsecaseCase } from '../types';

type SaveStatus = 'idle' | 'saved' | 'failed';

export function DetailToolbar({ crumbs, usecase, mode, activeCase }: { crumbs: Crumb[]; usecase: Usecase; mode: PreviewMode; activeCase?: UsecaseCase }) {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const saveTimer = useRef<ReturnType<typeof setTimeout>>();
  const share = useCopy();
  const copy = useCopy();
  const code = mode === 'context' && activeCase ? activeCase.loadCode() : mode === 'context' && usecase.loadContextCode ? usecase.loadContextCode() : usecase.loadCode();

  useEffect(() => () => clearTimeout(saveTimer.current), []);

  const save = async () => {
    try {
      const text = await code;
      const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = `${usecase.id.toLowerCase()}-${mode}.tsx`;
      link.click();
      URL.revokeObjectURL(url);
      setSaveStatus('saved');
    } catch {
      setSaveStatus('failed');
    }
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => setSaveStatus('idle'), 2000);
  };

  return <header className="ug-toolbar">
    <Breadcrumb crumbs={crumbs} />
    <div className="ug-toolbar__actions" aria-label="Document actions">
      <Button aui={{ color: saveStatus === 'failed' ? 'error' : 'secondary', paint: 'text', scale: 'sm' }} onClick={save}>{saveStatus === 'saved' ? 'Saved' : saveStatus === 'failed' ? 'Save failed' : 'Save'}</Button>
      <Button aui={{ color: share.status === 'failed' ? 'error' : 'secondary', paint: 'text', scale: 'sm' }} onClick={() => share.copy(window.location.href)}>{share.status === 'copied' ? 'Link copied' : share.status === 'failed' ? 'Share failed' : 'Share'}</Button>
      <Button aui={{ color: copy.status === 'failed' ? 'error' : 'secondary', paint: 'solid', scale: 'sm' }} onClick={() => code.then(copy.copy)}>{copy.status === 'copied' ? 'Copied' : copy.status === 'failed' ? 'Copy failed' : 'Copy'}</Button>
    </div>
    <span role="status" className="ug-visually-hidden" aria-live="polite">{saveStatus === 'saved' ? 'Code saved' : saveStatus === 'failed' ? 'Save failed' : share.status === 'copied' ? 'Link copied' : copy.status === 'copied' ? 'Code copied' : ''}</span>
  </header>;
}
