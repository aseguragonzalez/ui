import { LineChart, type LineChartSeries } from '@aseguragonzalez/ui';

const SERIES: LineChartSeries[] = [
  {
    id: 'ingresos',
    label: 'Ingresos',
    showArea: true,
    data: [
      { label: 'Ene', value: 4200 },
      { label: 'Feb', value: 5100 },
      { label: 'Mar', value: 4800 },
      { label: 'Abr', value: 6300 },
      { label: 'May', value: 7200 },
      { label: 'Jun', value: 8100 },
    ],
  },
  {
    id: 'gastos',
    label: 'Gastos',
    data: [
      { label: 'Ene', value: 3100 },
      { label: 'Feb', value: 3400 },
      { label: 'Mar', value: 3200 },
      { label: 'Abr', value: 3800 },
      { label: 'May', value: 4100 },
      { label: 'Jun', value: 4500 },
    ],
  },
];

export function RevenueChart() {
  return (
    <LineChart
      title="Ingresos vs. gastos mensuales — 2024"
      series={SERIES}
      style={{ width: '100%' }}
    />
  );
}
