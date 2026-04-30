import { forwardRef, useId } from 'react';
import styles from './LineChart.module.css';

export interface LineChartDatum {
  label: string;
  value: number;
}

export interface LineChartSeries {
  id: string;
  label: string;
  data: LineChartDatum[];
  color?: string;
  showArea?: boolean;
}

export interface LineChartProps {
  title: string;
  series: LineChartSeries[];
  /** Applies area fill to all series that don't specify their own showArea */
  showArea?: boolean;
  className?: string;
}

const SVG_W = 480;
const SVG_H = 280;
const M = { top: 20, right: 20, bottom: 56, left: 48 };
const CW = SVG_W - M.left - M.right;
const CH = SVG_H - M.top - M.bottom;
const GRID_STEPS = 4;

function formatNum(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(Math.round(n));
}

function seriesColor(s: LineChartSeries, index: number): string {
  return s.color ?? `var(--ds-chart-${(index % 6) + 1})`;
}

const LineChart = forwardRef<HTMLDivElement, LineChartProps>(
  ({ title, series, showArea: globalShowArea = false, className }, ref) => {
    const titleId = useId();
    const isEmpty = series.length === 0 || series.every((s) => s.data.length === 0);

    if (isEmpty) {
      return (
        <div className={[styles.empty, className ?? ''].filter(Boolean).join(' ')}>
          {title} — no data
        </div>
      );
    }

    const allValues = series.flatMap((s) => s.data.map((d) => d.value));
    const maxValue = Math.max(...allValues, 0);
    const labels = series[0].data.map((d) => d.label);
    const n = labels.length;

    const xPos = (i: number) =>
      n === 1 ? M.left + CW / 2 : M.left + (i / (n - 1)) * CW;
    const yPos = (v: number) =>
      M.top + CH - (maxValue > 0 ? (v / maxValue) * CH : 0);

    return (
      <div
        ref={ref}
        className={[styles.wrapper, className ?? ''].filter(Boolean).join(' ')}
      >
        <svg
          role="img"
          aria-labelledby={titleId}
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className={styles.svg}
        >
          <title id={titleId}>{title}</title>

          {/* Grid lines + Y axis labels */}
          {Array.from({ length: GRID_STEPS + 1 }, (_, i) => {
            const pct = i / GRID_STEPS;
            const y = M.top + CH - pct * CH;
            const val = maxValue * pct;
            return (
              <g key={i}>
                <line
                  x1={M.left}
                  y1={y}
                  x2={SVG_W - M.right}
                  y2={y}
                  stroke="var(--ds-chart-grid)"
                  strokeWidth="1"
                />
                <text
                  x={M.left - 6}
                  y={y}
                  textAnchor="end"
                  dominantBaseline="middle"
                  className={styles.axisLabel}
                >
                  {formatNum(val)}
                </text>
              </g>
            );
          })}

          {/* One line per series */}
          {series.map((s, si) => {
            const color = seriesColor(s, si);
            const shouldShowArea = s.showArea ?? globalShowArea;
            const pts = s.data.map((d, i) => `${xPos(i)},${yPos(d.value)}`).join(' ');
            const areaPts =
              `${xPos(0)},${M.top + CH} ` + pts + ` ${xPos(s.data.length - 1)},${M.top + CH}`;

            return (
              <g key={s.id}>
                {shouldShowArea && (
                  <polygon points={areaPts} fill={color} fillOpacity="0.12" />
                )}
                <polyline
                  points={pts}
                  fill="none"
                  stroke={color}
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                {s.data.map((d, i) => (
                  <circle key={d.label} cx={xPos(i)} cy={yPos(d.value)} r="4" fill={color}>
                    <title>{`${s.label} — ${d.label}: ${d.value}`}</title>
                  </circle>
                ))}
              </g>
            );
          })}

          {/* X axis labels (from first series) */}
          {labels.map((label, i) => (
            <text
              key={label}
              x={xPos(i)}
              y={SVG_H - M.bottom + 16}
              textAnchor="middle"
              className={styles.axisLabel}
            >
              {label}
            </text>
          ))}

          {/* X axis baseline */}
          <line
            x1={M.left}
            y1={M.top + CH}
            x2={SVG_W - M.right}
            y2={M.top + CH}
            stroke="var(--ds-chart-axis)"
            strokeWidth="1"
          />
        </svg>

        {series.length > 1 && (
          <ul className={styles.legend} aria-label="Chart legend">
            {series.map((s, i) => (
              <li key={s.id} className={styles.legendItem}>
                <span
                  className={styles.legendSwatch}
                  style={{ background: seriesColor(s, i) }}
                  aria-hidden="true"
                />
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);

LineChart.displayName = 'LineChart';
export { LineChart };
