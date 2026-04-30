import { RadarChart, type RadarSeries } from '@aseguragonzalez/ui';

const AXES = ['Velocidad', 'Fiabilidad', 'Escalabilidad', 'Seguridad', 'Coste', 'Soporte'];

const SERIES: RadarSeries[] = [
  {
    id: 'plan-pro',
    label: 'Plan Pro',
    values: [80, 90, 75, 85, 60, 70],
  },
  {
    id: 'plan-enterprise',
    label: 'Plan Enterprise',
    values: [95, 95, 92, 98, 40, 95],
  },
];

export function PlanComparisonChart() {
  return (
    <RadarChart
      title="Comparativa de planes — Pro vs. Enterprise"
      axes={AXES}
      series={SERIES}
      maxValue={100}
      style={{ width: '100%', maxWidth: 400 }}
    />
  );
}
