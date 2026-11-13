import { Fragment, isValidElement } from 'react';
import type { ReactElement, ReactNode } from 'react';

const INDENT = '  ';

function typeName(type: ReactElement['type']): string {
  if (type === Fragment) return '';
  if (typeof type === 'string') return type;
  const named = type as { displayName?: string; name?: string };
  return named.displayName ?? named.name ?? 'Component';
}

function literal(value: unknown): string {
  if (value && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>).map(
      ([key, v]) => `${key}: ${literal(v)}`,
    );
    return `{ ${entries.join(', ')} }`;
  }
  return typeof value === 'string' ? `'${value}'` : String(value);
}

function propsToString(props: Record<string, unknown>): string {
  return Object.entries(props)
    .filter(([key, value]) => key !== 'children' && value !== undefined)
    .map(([key, value]) => {
      if (value === true) return key;
      if (typeof value === 'string' && !value.includes("'")) return `${key}="${value}"`;
      return `${key}={${literal(value)}}`;
    })
    .join(' ');
}

function nodeToLines(node: ReactNode, depth: number): string[] {
  const pad = INDENT.repeat(depth);
  if (node === null || node === undefined || typeof node === 'boolean') return [];
  if (Array.isArray(node)) return node.flatMap((child) => nodeToLines(child, depth));
  if (!isValidElement(node)) return [`${pad}${String(node)}`];

  const { children, ...rest } = node.props as Record<string, unknown>;
  const name = typeName(node.type);
  const attrs = propsToString(rest);
  const open = `${name}${attrs ? ` ${attrs}` : ''}`;
  const inner = nodeToLines(children as ReactNode, depth + 1);

  if (inner.length === 0) return [`${pad}<${open} />`];
  if (inner.length === 1 && !inner[0].trimStart().startsWith('<')) {
    return [`${pad}<${open}>${inner[0].trim()}</${name}>`];
  }
  return [`${pad}<${open}>`, ...inner, `${pad}</${name}>`];
}

/** Turns a React element tree into the JSX text a consumer would write. */
export function elementToJsx(element: ReactNode): string {
  return nodeToLines(element, 0).join('\n');
}
