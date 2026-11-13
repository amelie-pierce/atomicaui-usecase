import { Suspense, use } from 'react';
import { Button, Card, Type } from '../kit';
import { useCopy } from '../hooks/use-copy';
import type { Usecase } from '../types';
import { PaneHeading } from './pane-header';

const LABEL = { idle: 'Copy', copied: 'Copied', failed: 'Copy failed' } as const;

function Snippet({ code }: { code: Promise<string> }) {
  return (
    <Type as="pre" family="mono" role="p3" className="ug-code__pre" tabIndex={0} aria-label="Code snippet">
      <code>{use(code)}</code>
    </Type>
  );
}

export function CodePane({ usecase }: { usecase: Usecase }) {
  const code = usecase.loadCode();
  const { status, copy } = useCopy();
  return (
    <section className="ug-pane" aria-labelledby="ug-code-heading">
      <div className="ug-pane__bar">
        <PaneHeading id="ug-code-heading">Code</PaneHeading>
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
      <Card aui={{ color: 'surface-alt' }} className="ug-code">
        <Card.Content className="ug-code__content">
          <Suspense fallback={null}>
            <Snippet code={code} />
          </Suspense>
        </Card.Content>
      </Card>
    </section>
  );
}
