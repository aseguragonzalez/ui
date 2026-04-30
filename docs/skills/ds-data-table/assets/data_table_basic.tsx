import { DataTable, type TableColumn, Badge } from '@aseguragonzalez/ui';

interface ProductRow extends Record<string, unknown> {
  id: string;
  nombre: string;
  categoria: string;
  precio: number;
  activo: boolean;
}

const COLUMNS: TableColumn<ProductRow>[] = [
  { key: 'nombre', header: 'Nombre', sortable: true },
  { key: 'categoria', header: 'Categoría', sortable: true },
  {
    key: 'precio',
    header: 'Precio',
    align: 'right',
    sortable: true,
    render: (value) =>
      new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value as number),
  },
  {
    key: 'activo',
    header: 'Estado',
    align: 'center',
    render: (value) => (
      <Badge variant={value ? 'success' : 'neutral'}>
        {value ? 'Activo' : 'Inactivo'}
      </Badge>
    ),
  },
];

const PRODUCTS: ProductRow[] = [
  { id: '1', nombre: 'Plan Básico', categoria: 'Suscripción', precio: 9.99, activo: true },
  { id: '2', nombre: 'Plan Pro', categoria: 'Suscripción', precio: 29.99, activo: true },
  { id: '3', nombre: 'Add-on Analíticas', categoria: 'Complemento', precio: 14.99, activo: false },
];

export function ProductTable() {
  return (
    <DataTable<ProductRow>
      caption="Catálogo de productos"
      columns={COLUMNS}
      data={PRODUCTS}
      defaultSortKey="nombre"
      defaultSortDirection="asc"
      emptyMessage="No hay productos disponibles."
    />
  );
}
