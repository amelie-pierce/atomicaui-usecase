import { Suspense, use } from 'react';
import { Button, Type } from '../kit';
import { useCopy } from '../hooks/use-copy';
import type { PreviewMode, Usecase, UsecaseCase } from '../types';

const LABEL = { idle: 'Copy', copied: 'Copied', failed: 'Copy failed' } as const;

function Snippet({ code }: { code: Promise<string> }) {
  return (
    <Type as="pre" family="mono" role="l3" weight="regular" className="ug-code__pre" tabIndex={0} aria-label="Code snippet">
      <code>{use(code)}</code>
    </Type>
  );
}

function CodeBlock({ usecase, code, label }: { usecase: Usecase; code: Promise<string>; label?: string }) {
  const { status, copy } = useCopy();
  return (
    <div className="ug-code">
      <div className="ug-code__bar">
        {label && <Type as="h3" role="l3" weight="semi-bold" className="ug-code__label">{label}</Type>}
        <Button
          aui={{ color: status === 'failed' ? 'error' : 'secondary', paint: 'tonal', scale: 'sm' }}
          aria-label={`Copy ${label ? `${label} ` : ''}code for ${usecase.id}`}
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
    </div>
  );
}

/** `bothUis`: a selection-based use case shows the code of its Component UI and of its In context UI. */
export function CodePane({ usecase, mode, activeCase, bothUis }: { usecase: Usecase; mode: PreviewMode; activeCase?: UsecaseCase; bothUis?: boolean }) {
  if (bothUis) {
    return (
      <>
        <CodeBlock usecase={usecase} label="Component UI" code={usecase.loadCode()} />
        <CodeBlock usecase={usecase} label="In context UI" code={activeCase ? activeCase.loadCode() : usecase.loadCode()} />
      </>
    );
  }
  const code =
    mode === 'context' && activeCase ? activeCase.loadCode() : mode === 'context' && usecase.loadContextCode ? usecase.loadContextCode() : usecase.loadCode();
  return <CodeBlock usecase={usecase} code={code} />;
}
