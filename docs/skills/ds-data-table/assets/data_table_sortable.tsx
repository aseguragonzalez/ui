import { useState, useEffect } from 'react';
import { DataTable, type TableColumn, type SortDirection, Spinner } from '@aseguragonzalez/ui';

interface OrderRow extends Record<string, unknown> {
  id: string;
  cliente: string;
  total: number;
  estado: 'pendiente' | 'completado' | 'cancelado';
  fecha: string;
}

const STATUS_LABEL: Record<OrderRow['estado'], string> = {
  pendiente: 'Pendiente',
  completado: 'Completado',
  cancelado: 'Cancelado',
};

const COLUMNS: TableColumn<OrderRow>[] = [
  { key: 'id', header: 'Nº pedido' },
  { key: 'cliente', header: 'Cliente', sortable: true },
  {
    key: 'total',
    header: 'Total',
    align: 'right',
    sortable: true,
    render: (value) =>
      new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value as number),
  },
  {
    key: 'estado',
    header: 'Estado',
    render: (value) => STATUS_LABEL[value as OrderRow['estado']] ?? String(value),
  },
  {
    key: 'fecha',
    header: 'Fecha',
    sortable: true,
    render: (value) => new Date(value as string).toLocaleDateString('es-ES'),
  },
];

async function fetchOrders(params: { sortKey: string; sortDirection: SortDirection }): Promise<OrderRow[]> {
  // Replace with your actual API call
  const url = `/api/orders?sort=${params.sortKey}&dir=${params.sortDirection}`;
  const res = await fetch(url);
  return res.json();
}

export function OrdersTable() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [sortKey, setSortKey] = useState('fecha');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchOrders({ sortKey, sortDirection })
      .then(setOrders)
      .finally(() => setLoading(false));
  }, [sortKey, sortDirection]);

  if (loading) {
    return <Spinner size="lg" aria-label="Cargando pedidos…" />;
  }

  return (
    <DataTable<OrderRow>
      caption="Listado de pedidos"
      columns={COLUMNS}
      data={orders}
      sortKey={sortKey}
      sortDirection={sortDirection}
      onSort={(key, direction) => {
        setSortKey(key);
        setSortDirection(direction);
      }}
      emptyMessage="No se encontraron pedidos."
    />
  );
}
