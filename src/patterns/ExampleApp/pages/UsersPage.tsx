import { useMemo, useState } from 'react';
import { Heading } from '../../../primitives/Heading/Heading';
import { Badge } from '../../../primitives/Badge/Badge';
import { SearchField } from '../../../components/SearchField/SearchField';
import { DataTable, type TableColumn } from '../../../components/DataTable/DataTable';
import { USERS } from '../mockData';

const userColumns: TableColumn[] = [
  { key: 'name',   header: 'Name',   sortable: true },
  { key: 'email',  header: 'Email',  sortable: true },
  { key: 'role',   header: 'Role',   sortable: true },
  {
    key: 'status',
    header: 'Status',
    render: (value) => (
      <Badge variant={value === 'active' ? 'success' : 'neutral'}>
        {String(value)}
      </Badge>
    ),
  },
  { key: 'joined', header: 'Joined', sortable: true, align: 'right' },
];

export function UsersPage() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return USERS;
    const q = search.toLowerCase();
    return USERS.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q),
    );
  }, [search]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-space-5)' }}>
      <Heading level={1} size="xl">Users</Heading>

      <div style={{ maxWidth: '320px' }}>
        <SearchField
          label="Search users"
          placeholder="Name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <DataTable
        caption="Team members"
        columns={userColumns as unknown as TableColumn[]}
        data={filtered as unknown as Record<string, unknown>[]}
        defaultSortKey="name"
        defaultSortDirection="asc"
        emptyMessage="No users match your search."
        rowKey="id"
      />
    </div>
  );
}
