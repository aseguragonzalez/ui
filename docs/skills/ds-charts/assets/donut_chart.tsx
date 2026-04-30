import { DonutChart, type DonutSegment } from '@aseguragonzalez/ui';

const SEGMENTS: DonutSegment[] = [
  { label: 'Orgánico', value: 4820 },
  { label: 'Directo', value: 2310 },
  { label: 'Referral', value: 1540 },
  { label: 'Email', value: 980 },
  { label: 'Social', value: 750 },
];

const total = SEGMENTS.reduce((s, d) => s + d.value, 0);

export function TrafficSourcesChart() {
  return (
    <DonutChart
      title="Fuentes de tráfico — últimos 30 días"
      segments={SEGMENTS}
      centerLabel={total.toLocaleString('es-ES')}
      centerSubLabel="visitas"
    />
  );
}

// Minimal donut without center labels
export function PlanDistributionChart() {
  return (
    <DonutChart
      title="Distribución de planes activos"
      segments={[
        { label: 'Free', value: 1200 },
        { label: 'Pro', value: 340 },
        { label: 'Enterprise', value: 60 },
      ]}
    />
  );
}
