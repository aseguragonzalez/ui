import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { DataTable, type TableColumn } from './DataTable';

type User = { name: string; age: number; city: string };

const columns: TableColumn<User>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'age', header: 'Age', sortable: true, align: 'right' },
  { key: 'city', header: 'City' },
];

const data: User[] = [
  { name: 'Ana', age: 30, city: 'Madrid' },
  { name: 'Carlos', age: 25, city: 'Barcelona' },
  { name: 'María', age: 35, city: 'Sevilla' },
];

describe('DataTable', () => {
  describe('rendering', () => {
    it('renders all column headers', () => {
      render(<DataTable caption="Users" columns={columns} data={data} />);
      expect(screen.getByRole('columnheader', { name: /name/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /age/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /city/i })).toBeInTheDocument();
    });

    it('renders all data rows', () => {
      render(<DataTable caption="Users" columns={columns} data={data} />);
      expect(screen.getByRole('cell', { name: 'Ana' })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: 'Carlos' })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: 'María' })).toBeInTheDocument();
    });

    it('renders empty state when data is empty', () => {
      render(
        <DataTable
          caption="Users"
          columns={columns}
          data={[]}
          emptyMessage="No users found."
        />,
      );
      expect(screen.getByText('No users found.')).toBeInTheDocument();
    });

    it('renders custom React nodes via render function', () => {
      const cols: TableColumn<User>[] = [
        { key: 'name', header: 'Name', render: (_, row) => <strong>{row.name}</strong> },
      ];
      render(<DataTable caption="Test" columns={cols} data={[{ name: 'Ana', age: 30, city: 'Madrid' }]} />);
      expect(screen.getByRole('cell').querySelector('strong')).toHaveTextContent('Ana');
    });

    it('passes the full row to render, enabling action buttons with handlers', async () => {
      const user = userEvent.setup();
      const handler = vi.fn();
      const cols: TableColumn<User>[] = [
        { key: 'name', header: 'Name' },
        {
          key: 'name',
          header: 'Actions',
          render: (_, row) => (
            <button type="button" onClick={() => handler(row)}>
              Edit
            </button>
          ),
        },
      ];
      render(<DataTable caption="Actions" columns={cols} data={data} />);
      const buttons = screen.getAllByRole('button', { name: 'Edit' });
      await user.click(buttons[0]);
      expect(handler).toHaveBeenCalledWith(data[0]);
    });
  });

  describe('sorting', () => {
    it('renders sort buttons on sortable columns', () => {
      render(<DataTable caption="Users" columns={columns} data={data} />);
      const nameHeader = screen.getByRole('columnheader', { name: /name/i });
      expect(within(nameHeader).getByRole('button')).toBeInTheDocument();
    });

    it('does not render sort button on non-sortable columns', () => {
      render(<DataTable caption="Users" columns={columns} data={data} />);
      const cityHeader = screen.getByRole('columnheader', { name: 'City' });
      expect(within(cityHeader).queryByRole('button')).not.toBeInTheDocument();
    });

    it('sets aria-sort="none" on sortable unsorted columns', () => {
      render(<DataTable caption="Users" columns={columns} data={data} />);
      expect(screen.getByRole('columnheader', { name: /name/i })).toHaveAttribute(
        'aria-sort',
        'none',
      );
    });

    it('sorts ascending when header is clicked', async () => {
      const user = userEvent.setup();
      render(<DataTable caption="Users" columns={columns} data={data} />);
      const nameBtn = within(
        screen.getByRole('columnheader', { name: /name/i }),
      ).getByRole('button');
      await user.click(nameBtn);
      const rows = screen.getAllByRole('row').slice(1);
      expect(within(rows[0]).getByRole('cell', { name: 'Ana' })).toBeInTheDocument();
    });

    it('calls onSort when a sortable header is clicked', async () => {
      const user = userEvent.setup();
      const handler = vi.fn();
      render(
        <DataTable caption="Users" columns={columns} data={data} onSort={handler} />,
      );
      const nameBtn = within(
        screen.getByRole('columnheader', { name: /name/i }),
      ).getByRole('button');
      await user.click(nameBtn);
      expect(handler).toHaveBeenCalledWith('name', 'asc');
    });

    it('sets aria-sort="ascending" after sorting asc', async () => {
      const user = userEvent.setup();
      render(<DataTable caption="Users" columns={columns} data={data} />);
      await user.click(
        within(screen.getByRole('columnheader', { name: /name/i })).getByRole('button'),
      );
      expect(screen.getByRole('columnheader', { name: /name/i })).toHaveAttribute(
        'aria-sort',
        'ascending',
      );
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — default', async () => {
      const { container } = render(
        <DataTable caption="Users" columns={columns} data={data} />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — empty state', async () => {
      const { container } = render(
        <DataTable caption="Users" columns={columns} data={[]} />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — after sort', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <DataTable caption="Users" columns={columns} data={data} />,
      );
      await user.click(
        within(screen.getByRole('columnheader', { name: /name/i })).getByRole('button'),
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
