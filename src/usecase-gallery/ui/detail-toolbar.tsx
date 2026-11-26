import { Button, Field, Panels, Type } from '../kit';

export function DetailToolbar({
  treeCollapsed,
  onTreeToggle,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  panelMode = false,
}: {
  treeCollapsed: boolean;
  onTreeToggle: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: () => void;
  panelMode?: boolean;
}) {
  return <header className={`ug-toolbar${panelMode ? ' ug-toolbar--panels' : ''}`} aria-label="Gallery controls">
    <div className="ug-toolbar__brand">
      {panelMode
        ? <Panels.Trigger targetId="component-tree" name="bars" aria-label={treeCollapsed ? 'Show components' : 'Hide components'} aria-controls="component-tree-pane" aui={{ color: 'secondary', paint: 'text', profile: 'square-compact', shape: 'soft', scale: 'sm' }} />
        : <Button aui={{ color: 'secondary', paint: 'text', scale: 'sm' }} aria-expanded={!treeCollapsed} aria-controls="component-tree-pane" onClick={onTreeToggle}>{treeCollapsed ? 'Show components' : 'Hide components'}</Button>}
      <Type role="l2" as="h1" weight="semi-bold">AtomicAUI</Type>
    </div>
    <Field className="ug-toolbar__search" aui={{ scale: 'sm' }}>
      <Field.Control>
        <Field.Icon name="magnifying-glass" />
        <Field.Input
          type="search"
          aria-label="Search components and use cases"
          placeholder="Search components and use cases"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') onSearchChange('');
            if (event.key === 'Enter') onSearchSubmit();
          }}
        />
        {searchQuery && <Field.Button aria-label="Clear search" onClick={() => onSearchChange('')}><Field.ButtonIcon name="xmark" /></Field.Button>}
      </Field.Control>
    </Field>
  </header>;
}
