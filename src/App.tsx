import { useEffect, useState } from 'react';
import { COMPONENT_NAMES, USE_CASES } from './usecases/registry';
import './gallery.css';

const readHash = () => decodeURIComponent(window.location.hash.slice(1));

export default function App() {
  const [selectedId, setSelectedId] = useState(readHash);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onHashChange = () => setSelectedId(readHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => setCopied(false), [selectedId]);

  const selected = USE_CASES.find((u) => u.id === selectedId) ?? USE_CASES[0];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(selected.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="gallery">
      <nav className="gallery-sidebar" aria-label="Components and use cases">
        <h1 className="gallery-brand">AtomicAUI use cases</h1>
        {COMPONENT_NAMES.map((name) => (
          <details key={name} className="gallery-group" open>
            <summary>{name}</summary>
            <ul>
              {USE_CASES.filter((u) => u.component === name).map((u) => (
                <li key={u.id}>
                  <a
                    href={`#${u.id}`}
                    aria-current={u.id === selected.id ? 'page' : undefined}
                  >
                    <span className="gallery-id">{u.id}</span>
                    {u.title}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </nav>
      <main className="gallery-main" aria-labelledby="usecase-title">
        <header>
          <p className="gallery-id">{selected.id}</p>
          <h2 id="usecase-title">{selected.title}</h2>
          <p className="gallery-description">{selected.description}</p>
        </header>
        <section aria-label="Preview" className="gallery-preview">
          {selected.element}
        </section>
        <section aria-label="Code" className="gallery-code">
          <div className="gallery-code-bar">
            <span>JSX</span>
            <button type="button" onClick={copy} aria-label={`Copy code for ${selected.id}`}>
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <span role="status" className="gallery-sr">{copied ? 'Code copied to clipboard' : ''}</span>
          </div>
          <pre><code>{selected.code}</code></pre>
        </section>
      </main>
    </div>
  );
}
