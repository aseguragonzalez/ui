import { BarChart, type BarChartSeries } from '@aseguragonzalez/ui';

// Single series
const SINGLE_SERIES: BarChartSeries[] = [
  {
    id: 'registros',
    label: 'Nuevos registros',
    data: [
      { label: 'Ene', value: 320 },
      { label: 'Feb', value: 480 },
      { label: 'Mar', value: 410 },
      { label: 'Abr', value: 560 },
      { label: 'May', value: 720 },
      { label: 'Jun', value: 690 },
    ],
  },
];

export function RegistrosChart() {
  return (
    <BarChart
      title="Nuevos registros por mes — 2024"
      series={SINGLE_SERIES}
      style={{ width: '100%' }}
    />
  );
}

// Multi-series (grouped bars)
const MULTI_SERIES: BarChartSeries[] = [
  {
    id: 'web',
    label: 'Web',
    data: [
      { label: 'T1', value: 1200 },
      { label: 'T2', value: 1540 },
      { label: 'T3', value: 1380 },
      { label: 'T4', value: 1750 },
    ],
  },
  {
    id: 'movil',
    label: 'Móvil',
    data: [
      { label: 'T1', value: 800 },
      { label: 'T2', value: 960 },
      { label: 'T3', value: 1100 },
      { label: 'T4', value: 1300 },
    ],
  },
];

export function SessionsByChannelChart() {
  return (
    <BarChart
      title="Sesiones por canal y trimestre — 2024"
      series={MULTI_SERIES}
      style={{ width: '100%' }}
    />
  );
}
