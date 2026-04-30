import { BarChart, LineChart, DonutChart, Heading } from '@aseguragonzalez/ui';
import type { BarChartSeries, LineChartSeries, DonutSegment } from '@aseguragonzalez/ui';

const registros: BarChartSeries[] = [
  {
    id: 'registros',
    label: 'Registros',
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

const tendencia: LineChartSeries[] = [
  {
    id: 'mau',
    label: 'Usuarios activos',
    showArea: true,
    data: [
      { label: 'Ene', value: 2100 },
      { label: 'Feb', value: 2400 },
      { label: 'Mar', value: 2200 },
      { label: 'Abr', value: 2800 },
      { label: 'May', value: 3100 },
      { label: 'Jun', value: 3500 },
    ],
  },
];

const canales: DonutSegment[] = [
  { label: 'Orgánico', value: 4820 },
  { label: 'Directo', value: 2310 },
  { label: 'Referral', value: 1540 },
  { label: 'Email', value: 980 },
];

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '1.5rem',
};

const cardStyle: React.CSSProperties = {
  background: 'var(--ds-color-surface-default)',
  border: '1px solid var(--ds-color-border-subtle)',
  borderRadius: 'var(--ds-radius-lg)',
  padding: '1.25rem',
};

export function MetricsDashboard() {
  return (
    <section aria-labelledby="dashboard-heading">
      <Heading id="dashboard-heading" level="h1" size="xl" style={{ marginBottom: '1.5rem' }}>
        Métricas generales
      </Heading>

      <div style={gridStyle}>
        <div style={cardStyle}>
          <BarChart
            title="Nuevos registros por mes"
            series={registros}
          />
        </div>

        <div style={cardStyle}>
          <LineChart
            title="Usuarios activos mensuales"
            series={tendencia}
          />
        </div>

        <div style={cardStyle}>
          <DonutChart
            title="Distribución de canales de adquisición"
            segments={canales}
            centerLabel="9.650"
            centerSubLabel="visitas"
          />
        </div>
      </div>
    </section>
  );
}
