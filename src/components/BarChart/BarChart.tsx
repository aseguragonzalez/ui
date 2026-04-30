import { forwardRef, useId } from 'react';
import styles from './BarChart.module.css';

export interface BarChartDatum {
  label: string;
  value: number;
}

export interface BarChartSeries {
  id: string;
  label: string;
  data: BarChartDatum[];
  color?: string;
}

export interface BarChartProps {
  title: string;
  series: BarChartSeries[];
  className?: string;
}

const SVG_W = 480;
const SVG_H = 280;
const M = { top: 20, right: 20, bottom: 56, left: 48 };
const CW = SVG_W - M.left - M.right;
const CH = SVG_H - M.top - M.bottom;
const GRID_STEPS = 4;
const BAR_GAP = 2;

function formatNum(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(Math.round(n));
}

function seriesColor(series: BarChartSeries, index: number): string {
  return series.color ?? `var(--ds-chart-${(index % 6) + 1})`;
}

const BarChart = forwardRef<HTMLDivElement, BarChartProps>(
  ({ title, series, className }, ref) => {
    const titleId = useId();
    const isEmpty = series.length === 0 || series.every((s) => s.data.length === 0);

    if (isEmpty) {
      return (
        <div className={[styles.empty, className ?? ''].filter(Boolean).join(' ')}>
          {title} — no data
        </div>
      );
    }

    const labels = series[0].data.map((d) => d.label);
    const numGroups = labels.length;
    const numSeries = series.length;

    const maxValue = Math.max(
      ...series.flatMap((s) => s.data.map((d) => d.value)),
      0,
    );

    const groupW = CW / numGroups;
    const barW = Math.min(
      Math.max((groupW * 0.8 - BAR_GAP * (numSeries - 1)) / numSeries, 4),
      numSeries === 1 ? 60 : 40,
    );

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

          {/* Grouped bars + X axis labels */}
          {labels.map((label, g) => {
            const allBarsW = barW * numSeries + BAR_GAP * (numSeries - 1);
            const groupLeft = M.left + g * groupW;
            const groupBarStart = groupLeft + (groupW - allBarsW) / 2;
            const labelX = groupLeft + groupW / 2;

            return (
              <g key={label}>
                {series.map((s, si) => {
                  const datum = s.data[g];
                  if (!datum) return null;
                  const barH = maxValue > 0 ? (datum.value / maxValue) * CH : 0;
                  const barX = groupBarStart + si * (barW + BAR_GAP);
                  const barY = M.top + CH - barH;
                  const color = seriesColor(s, si);
                  return (
                    <rect
                      key={s.id}
                      x={barX}
                      y={barY}
                      width={barW}
                      height={barH}
                      fill={color}
                      rx="3"
                      className={styles.bar}
                    >
                      <title>{`${s.label} — ${label}: ${formatNum(datum.value)}`}</title>
                    </rect>
                  );
                })}
                <text
                  x={labelX}
                  y={SVG_H - M.bottom + 16}
                  textAnchor="middle"
                  className={styles.axisLabel}
                >
                  {label}
                </text>
              </g>
            );
          })}

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

        {numSeries > 1 && (
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

BarChart.displayName = 'BarChart';
export { BarChart };
