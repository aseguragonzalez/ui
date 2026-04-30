import { forwardRef, useId, useState } from 'react';
import styles from './DataTable.module.css';

export type SortDirection = 'asc' | 'desc';

export interface TableColumn<TRow extends Record<string, unknown> = Record<string, unknown>> {
  key: string;
  header: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  render?: (value: unknown, row: TRow) => React.ReactNode;
}

export interface DataTableProps<TRow extends Record<string, unknown> = Record<string, unknown>> {
  caption: string;
  columns: TableColumn<TRow>[];
  data: TRow[];
  defaultSortKey?: string;
  defaultSortDirection?: SortDirection;
  /** Controlled sort key */
  sortKey?: string;
  /** Controlled sort direction */
  sortDirection?: SortDirection;
  onSort?: (key: string, direction: SortDirection) => void;
  /** Field name used as stable React key for rows. Strongly recommended to avoid index-key issues when sorting. */
  rowKey?: keyof TRow;
  /** Message shown when data array is empty */
  emptyMessage?: string;
  className?: string;
}

const alignClass: Record<string, string> = {
  left: styles.alignLeft,
  center: styles.alignCenter,
  right: styles.alignRight,
};

const SortAscIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
    <path d="M6 2L10 8H2L6 2Z" />
  </svg>
);

const SortDescIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
    <path d="M6 10L2 4H10L6 10Z" />
  </svg>
);

const SortNeutralIcon = () => (
  <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor" aria-hidden="true">
    <path d="M6 1L10 5H2L6 1Z" opacity="0.4" />
    <path d="M6 13L2 9H10L6 13Z" opacity="0.4" />
  </svg>
);

const DataTable = forwardRef(function DataTableInner<
  TRow extends Record<string, unknown>,
>(
  {
    caption,
    columns,
    data,
    defaultSortKey,
    defaultSortDirection = 'asc',
    sortKey: controlledSortKey,
    sortDirection: controlledSortDirection,
    onSort,
    rowKey,
    emptyMessage = 'No data available.',
    className,
  }: DataTableProps<TRow>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const announceId = useId();
  const [sortAnnouncement, setSortAnnouncement] = useState('');
  const [internalSortKey, setInternalSortKey] = useState<string | undefined>(defaultSortKey);
  const [internalSortDir, setInternalSortDir] = useState<SortDirection>(defaultSortDirection);

  const sortKey = controlledSortKey ?? internalSortKey;
  const sortDirection = controlledSortDirection ?? internalSortDir;

  const handleSort = (key: string) => {
    const newDirection: SortDirection =
      sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';

    if (controlledSortKey === undefined) {
      setInternalSortKey(key);
      setInternalSortDir(newDirection);
    }
    onSort?.(key, newDirection);

    const col = columns.find((c) => c.key === key);
    if (col) {
      setSortAnnouncement(
        `Table sorted by ${col.header}, ${newDirection === 'asc' ? 'ascending' : 'descending'}.`,
      );
    }
  };

  const sortedData =
    controlledSortKey !== undefined || !sortKey
      ? data
      : [...data].sort((a, b) => {
          const aVal = a[sortKey];
          const bVal = b[sortKey];
          const cmp =
            typeof aVal === 'number' && typeof bVal === 'number'
              ? aVal - bVal
              : String(aVal ?? '').localeCompare(String(bVal ?? ''));
          return sortDirection === 'asc' ? cmp : -cmp;
        });

  const getAriaSort = (col: TableColumn<TRow>): React.AriaAttributes['aria-sort'] => {
    if (!col.sortable) return undefined;
    if (sortKey !== col.key) return 'none';
    return sortDirection === 'asc' ? 'ascending' : 'descending';
  };

  return (
    <div
      ref={ref}
      className={[styles.wrapper, className ?? ''].filter(Boolean).join(' ')}
      role="region"
      aria-label={caption}
    >
      <div
        id={announceId}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={styles.srOnly}
      >
        {sortAnnouncement}
      </div>
      <table className={styles.table}>
        <caption className={styles.caption}>{caption}</caption>
        <thead className={styles.thead}>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={[
                  styles.th,
                  col.sortable ? styles.thSortable : '',
                  sortKey === col.key ? styles.thActive : '',
                  alignClass[col.align ?? 'left'],
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-sort={getAriaSort(col)}
              >
                {col.sortable ? (
                  <button
                    type="button"
                    className={styles.sortButton}
                    onClick={() => handleSort(col.key)}
                  >
                    {col.header}
                    <span className={styles.sortIcon}>
                      {sortKey === col.key ? (
                        sortDirection === 'asc' ? (
                          <SortAscIcon />
                        ) : (
                          <SortDescIcon />
                        )
                      ) : (
                        <SortNeutralIcon />
                      )}
                    </span>
                  </button>
                ) : (
                  col.header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {sortedData.length === 0 ? (
            <tr>
              <td
                className={[styles.td, styles.emptyState].join(' ')}
                colSpan={columns.length}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sortedData.map((row, rowIndex) => (
              <tr key={rowKey ? String(row[rowKey as string]) : rowIndex} className={styles.tr}>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={[styles.td, alignClass[col.align ?? 'left']]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}) as <TRow extends Record<string, unknown> = Record<string, unknown>>(
  props: DataTableProps<TRow> & React.RefAttributes<HTMLDivElement>,
) => React.ReactElement | null;

(DataTable as { displayName?: string }).displayName = 'DataTable';
export { DataTable };
