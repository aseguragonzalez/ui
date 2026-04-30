import { forwardRef, useId } from 'react';
import styles from './ScatterPlot.module.css';

export interface ScatterDatum {
  x: number;
  y: number;
  label?: string;
}

export interface ScatterSeries {
  id: string;
  label: string;
  data: ScatterDatum[];
  color?: string;
}

export interface ScatterPlotProps {
  title: string;
  series: ScatterSeries[];
  xLabel?: string;
  yLabel?: string;
  className?: string;
}

const SVG_W = 480;
const SVG_H = 320;
const M = { top: 20, right: 20, bottom: 64, left: 56 };
const CW = SVG_W - M.left - M.right;
const CH = SVG_H - M.top - M.bottom;
const GRID_STEPS = 4;
const PAD = 0.1;

function formatNum(n: number): string {
  if (Math.abs(n) >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (Math.abs(n) >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(Number.isInteger(n) ? n : n.toFixed(1));
}

function seriesColor(s: ScatterSeries, index: number): string {
  return s.color ?? `var(--ds-chart-${(index % 6) + 1})`;
}

const ScatterPlot = forwardRef<HTMLDivElement, ScatterPlotProps>(
  ({ title, series, xLabel, yLabel, className }, ref) => {
    const titleId = useId();
    const isEmpty = series.length === 0 || series.every((s) => s.data.length === 0);

    if (isEmpty) {
      return (
        <div className={[styles.empty, className ?? ''].filter(Boolean).join(' ')}>
          {title} — no data
        </div>
      );
    }

    const allX = series.flatMap((s) => s.data.map((d) => d.x));
    const allY = series.flatMap((s) => s.data.map((d) => d.y));
    const rawXMin = Math.min(...allX);
    const rawXMax = Math.max(...allX);
    const rawYMin = Math.min(...allY);
    const rawYMax = Math.max(...allY);

    const xRange = rawXMax - rawXMin || 1;
    const yRange = rawYMax - rawYMin || 1;
    const xMin = rawXMin - xRange * PAD;
    const xMax = rawXMax + xRange * PAD;
    const yMin = rawYMin - yRange * PAD;
    const yMax = rawYMax + yRange * PAD;

    const scaleX = (v: number) => M.left + ((v - xMin) / (xMax - xMin)) * CW;
    const scaleY = (v: number) => M.top + CH - ((v - yMin) / (yMax - yMin)) * CH;

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

          {/* Horizontal grid lines + Y labels */}
          {Array.from({ length: GRID_STEPS + 1 }, (_, i) => {
            const pct = i / GRID_STEPS;
            const y = M.top + CH - pct * CH;
            const val = yMin + (yMax - yMin) * pct;
            return (
              <g key={`gy-${i}`}>
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

          {/* Vertical grid lines + X labels */}
          {Array.from({ length: GRID_STEPS + 1 }, (_, i) => {
            const pct = i / GRID_STEPS;
            const x = M.left + pct * CW;
            const val = xMin + (xMax - xMin) * pct;
            return (
              <g key={`gx-${i}`}>
                <line
                  x1={x}
                  y1={M.top}
                  x2={x}
                  y2={M.top + CH}
                  stroke="var(--ds-chart-grid)"
                  strokeWidth="1"
                />
                <text
                  x={x}
                  y={M.top + CH + 16}
                  textAnchor="middle"
                  className={styles.axisLabel}
                >
                  {formatNum(val)}
                </text>
              </g>
            );
          })}

          {/* Data points per series */}
          {series.map((s, si) => {
            const color = seriesColor(s, si);
            return (
              <g key={s.id}>
                {s.data.map((d, i) => (
                  <circle
                    key={i}
                    cx={scaleX(d.x)}
                    cy={scaleY(d.y)}
                    r="5"
                    fill={color}
                    fillOpacity="0.7"
                    stroke={color}
                    strokeWidth="1"
                    className={styles.point}
                  >
                    <title>
                      {d.label
                        ? `${s.label} — ${d.label}: (${d.x}, ${d.y})`
                        : `${s.label}: (${d.x}, ${d.y})`}
                    </title>
                  </circle>
                ))}
              </g>
            );
          })}

          {/* Axis baselines */}
          <line
            x1={M.left}
            y1={M.top + CH}
            x2={SVG_W - M.right}
            y2={M.top + CH}
            stroke="var(--ds-chart-axis)"
            strokeWidth="1"
          />
          <line
            x1={M.left}
            y1={M.top}
            x2={M.left}
            y2={M.top + CH}
            stroke="var(--ds-chart-axis)"
            strokeWidth="1"
          />

          {/* Axis titles */}
          {xLabel && (
            <text
              x={M.left + CW / 2}
              y={SVG_H - 8}
              textAnchor="middle"
              className={styles.axisTitle}
            >
              {xLabel}
            </text>
          )}
          {yLabel && (
            <text
              x={12}
              y={M.top + CH / 2}
              textAnchor="middle"
              transform={`rotate(-90 12 ${M.top + CH / 2})`}
              className={styles.axisTitle}
            >
              {yLabel}
            </text>
          )}
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

ScatterPlot.displayName = 'ScatterPlot';
export { ScatterPlot };
