---
name: ds-data-table
description: Build a sortable data table. Use when asked for a data table, list view, admin grid, or any tabular display with optional sorting.
compatibility: Requires @aseguragonzalez/ui. React 18+.
metadata:
  layer: ui
  pattern: data-display
allowed-tools: Read Glob Write Edit
---

Build a typed data table using `DataTable<TRow>`. The component handles accessible markup, sort state, and empty/data states.

## Step 1 — Define the row type

Define a TypeScript interface for each row. It must satisfy `Record<string, unknown>` (all values typed as `unknown` at the constraint level — the actual type can be more specific):

```ts
interface UserRow extends Record<string, unknown> {
  id: string;
  nombre: string;
  email: string;
  rol: string;
  createdAt: string;
}
```

## Step 2 — Define columns

Each column needs at minimum `key` and `header`. Add `sortable` for columns the user can click to sort. Add `render` for non-string values:

```ts
const columns: TableColumn<UserRow>[] = [
  { key: 'nombre', header: 'Nombre', sortable: true },
  { key: 'email', header: 'Correo' },
  { key: 'rol', header: 'Rol', align: 'center' },
  {
    key: 'createdAt',
    header: 'Fecha de alta',
    sortable: true,
    render: (value) => new Date(value as string).toLocaleDateString('es-ES'),
  },
  {
    key: 'id',
    header: 'Acciones',
    align: 'right',
    render: (_, row) => <Button size="sm" variant="ghost">Ver</Button>,
  },
];
```

## Step 3 — Choose uncontrolled vs. controlled sort

**Uncontrolled** (component manages sort state internally):

```tsx
<DataTable
  caption="Lista de usuarios"
  columns={columns}
  data={users}
  defaultSortKey="nombre"
  defaultSortDirection="asc"
  emptyMessage="No hay usuarios todavía."
/>
```

**Controlled** (parent manages sort, e.g. for server-side sorting):

```tsx
<DataTable
  caption="Lista de usuarios"
  columns={columns}
  data={users}
  sortKey={sortKey}
  sortDirection={sortDirection}
  onSort={(key, direction) => {
    setSortKey(key);
    setSortDirection(direction);
    fetchUsers({ sortKey: key, sortDirection: direction });
  }}
/>
```

In controlled mode the component does **not** sort `data` itself — the caller is responsible for passing already-sorted data.

## Step 4 — Write the file

Read asset templates:
- `assets/data_table_basic.tsx` — minimal uncontrolled table
- `assets/data_table_sortable.tsx` — controlled sort with server-side fetch

## Gotchas

- `caption` is **required** — it is used as the accessible `aria-label` for the table region and as the visual `<caption>`. Always provide a meaningful description.
- The generic parameter `TRow` must extend `Record<string, unknown>`. TypeScript will reject a row type with missing index signature — add `extends Record<string, unknown>` to your interface.
- `render(value, row)` — `value` is `row[col.key]`, typed as `unknown`. Cast it as needed. Use `row` when rendering requires multiple fields (e.g., a full-name cell combining `firstName` + `lastName`).
- **Uncontrolled sort** mutates a copy of `data` internally. Pass stable data; avoid re-creating the array on every render.
- **Controlled sort** skips internal sorting entirely. If `sortKey` is passed (even `undefined`-ish, but present in props), the component treats it as controlled — pass both `sortKey` and `sortDirection` together.
- `emptyMessage` defaults to the English string `"No data available."` — always override with a Spanish string.
- `align` on a column applies to both the `<th>` and every `<td>` in that column.
