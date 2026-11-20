import { Type } from '../kit';

export interface Crumb {
  label: string;
  /** Absent on the current page, the last crumb. */
  href?: string;
}

/** The path to the current page: Components > Button > Button-013. */
export function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="ug-crumbs">
      <ol className="ug-crumbs__list">
        {crumbs.map(({ label, href }) => (
          <li key={label} className="ug-crumbs__item">
            {href ? (
              <a className="ug-crumbs__link" href={href}>
                <Type role="l3" as="span" weight="semi-bold">{label}</Type>
              </a>
            ) : (
              <Type role="l3" as="span" weight="bold" aria-current="page">{label}</Type>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
