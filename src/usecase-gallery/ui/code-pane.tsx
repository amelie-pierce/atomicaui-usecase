import { Suspense, use } from 'react';
import { Button, Type } from '../kit';
import { useCopy } from '../hooks/use-copy';
import type { PreviewMode, Usecase } from '../types';
import { PaneCard } from './pane-card';

const LABEL = { idle: 'Copy', copied: 'Copied', failed: 'Copy failed' } as const;

function Snippet({ code }: { code: Promise<string> }) {
  return (
    <Type as="pre" family="mono" role="l3" weight="regular" className="ug-code__pre" tabIndex={0} aria-label="Code snippet">
      <code>{use(code)}</code>
    </Type>
  );
}

export function CodePane({ usecase, mode }: { usecase: Usecase; mode: PreviewMode }) {
  const code = mode === 'context' && usecase.loadContextCode ? usecase.loadContextCode() : usecase.loadCode();
  const { status, copy } = useCopy();
  return (
    <PaneCard label="Code" className="ug-code">
      <div className="ug-code__bar">
        <Button
          aui={{ color: status === 'failed' ? 'error' : 'secondary', paint: 'tonal', scale: 'sm' }}
          aria-label={`Copy code for ${usecase.id}`}
          onClick={() => code.then(copy)}
        >
          {LABEL[status]}
        </Button>
        <span role="status" className="ug-visually-hidden">
          {status === 'copied' ? 'Code copied to clipboard' : status === 'failed' ? 'Copy failed' : ''}
        </span>
      </div>
      <Suspense fallback={null}>
        <Snippet code={code} />
      </Suspense>
    </PaneCard>
  );
}
