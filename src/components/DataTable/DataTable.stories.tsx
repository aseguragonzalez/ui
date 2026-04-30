import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../../primitives/Badge/Badge';
import { Button } from '../../primitives/Button/Button';
import { DataTable, type TableColumn } from './DataTable';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

type User = { name: string; email: string; role: string; status: string; joined: string };

const userData: User[] = [
  { name: 'Alice Johnson', email: 'alice@acme.com', role: 'Admin', status: 'active', joined: '2023-01-15' },
  { name: 'Charles Davis', email: 'charles@acme.com', role: 'Editor', status: 'active', joined: '2023-03-22' },
  { name: 'Maria Chen', email: 'maria@acme.com', role: 'Viewer', status: 'inactive', joined: '2023-06-10' },
  { name: 'James Martin', email: 'james@acme.com', role: 'Editor', status: 'active', joined: '2024-01-05' },
  { name: 'Laura Torres', email: 'laura@acme.com', role: 'Admin', status: 'active', joined: '2024-02-14' },
];

const userColumns: TableColumn<User>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
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

export const Default: Story = {
  args: {
    caption: 'Team members',
    columns: userColumns as TableColumn[],
    data: userData as unknown as Record<string, unknown>[],
  },
};

export const Sortable: Story = {
  args: {
    caption: 'Sortable team members',
    columns: userColumns as TableColumn[],
    data: userData as unknown as Record<string, unknown>[],
    defaultSortKey: 'name',
    defaultSortDirection: 'asc',
  },
};

export const EmptyState: Story = {
  args: {
    caption: 'Team members',
    columns: userColumns as TableColumn[],
    data: [],
    emptyMessage: 'No team members found.',
  },
};

export const WithActionColumn: Story = {
  render: () => {
    const columnsWithActions: TableColumn<User>[] = [
      { key: 'name', header: 'Name', sortable: true },
      { key: 'email', header: 'Email' },
      { key: 'role', header: 'Role' },
      {
        key: 'status',
        header: 'Status',
        render: (value) => (
          <Badge variant={value === 'active' ? 'success' : 'neutral'}>
            {String(value)}
          </Badge>
        ),
      },
      {
        key: 'name',
        header: 'Actions',
        align: 'right',
        render: (_, row) => (
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => alert(`Edit: ${row.name}`)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => alert(`Delete: ${row.name}`)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ];

    return (
      <DataTable<User>
        caption="Team members with actions"
        columns={columnsWithActions}
        data={userData}
        defaultSortKey="name"
      />
    );
  },
};

type Product = { product: string; sales: number; revenue: number; growth: string };

const numericColumns: TableColumn<Product>[] = [
  { key: 'product', header: 'Product', sortable: true },
  { key: 'sales', header: 'Sales', sortable: true, align: 'right' },
  { key: 'revenue', header: 'Revenue (€)', sortable: true, align: 'right' },
  { key: 'growth', header: 'Growth', align: 'center' },
];

const numericData: Product[] = [
  { product: 'Plan Basic', sales: 1240, revenue: 24800, growth: '+12%' },
  { product: 'Plan Pro', sales: 430, revenue: 86000, growth: '+28%' },
  { product: 'Plan Enterprise', sales: 52, revenue: 104000, growth: '+5%' },
];

export const WithNumbers: Story = {
  args: {
    caption: 'Product performance',
    columns: numericColumns as TableColumn[],
    data: numericData as unknown as Record<string, unknown>[],
    defaultSortKey: 'revenue',
    defaultSortDirection: 'desc',
  },
};
