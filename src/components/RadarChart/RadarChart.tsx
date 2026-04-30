import { forwardRef, useId } from 'react';
import styles from './RadarChart.module.css';

export interface RadarSeries {
  id: string;
  label: string;
  values: number[];
  color?: string;
}

export interface RadarChartProps {
  title: string;
  axes: string[];
  series: RadarSeries[];
  /** Explicit max value; defaults to the max across all series */
  maxValue?: number;
  className?: string;
}

const SVG_W = 320;
const SVG_H = 320;
const CX = SVG_W / 2;
const CY = SVG_H / 2;
const R = 110;
const RING_STEPS = 4;

function seriesColor(s: RadarSeries, index: number): string {
  return s.color ?? `var(--ds-chart-${(index % 6) + 1})`;
}

function angleForAxis(i: number, total: number): number {
  // Start at the top (−π/2) and go clockwise
  return -Math.PI / 2 + (2 * Math.PI * i) / total;
}

function polarToCartesian(r: number, angle: number): [number, number] {
  return [CX + r * Math.cos(angle), CY + r * Math.sin(angle)];
}

function polygonPoints(values: number[], maxVal: number, total: number): string {
  return values
    .map((v, i) => {
      const r = maxVal > 0 ? (v / maxVal) * R : 0;
      const [x, y] = polarToCartesian(r, angleForAxis(i, total));
      return `${x},${y}`;
    })
    .join(' ');
}

const RadarChart = forwardRef<HTMLDivElement, RadarChartProps>(
  ({ title, axes, series, maxValue: explicitMax, className }, ref) => {
    const titleId = useId();
    const isEmpty = axes.length === 0 || series.length === 0;

    if (isEmpty) {
      return (
        <div className={[styles.empty, className ?? ''].filter(Boolean).join(' ')}>
          {title} — no data
        </div>
      );
    }

    const n = axes.length;
    const computedMax = Math.max(...series.flatMap((s) => s.values), 0);
    const maxVal = explicitMax ?? computedMax;

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

          {/* Concentric grid rings */}
          {Array.from({ length: RING_STEPS }, (_, i) => {
            const ringR = ((i + 1) / RING_STEPS) * R;
            const pts = Array.from({ length: n }, (_, j) => {
              const [x, y] = polarToCartesian(ringR, angleForAxis(j, n));
              return `${x},${y}`;
            }).join(' ');
            return (
              <polygon
                key={i}
                points={pts}
                className={styles.ring}
              />
            );
          })}

          {/* Axis lines from center to each vertex */}
          {axes.map((axis, i) => {
            const [x, y] = polarToCartesian(R, angleForAxis(i, n));
            return (
              <line
                key={axis}
                x1={CX}
                y1={CY}
                x2={x}
                y2={y}
                className={styles.axisLine}
              />
            );
          })}

          {/* Data series polygons — render fills first, then strokes on top */}
          {series.map((s, si) => {
            const color = seriesColor(s, si);
            const pts = polygonPoints(s.values, maxVal, n);
            return (
              <polygon
                key={`${s.id}-fill`}
                points={pts}
                fill={color}
                fillOpacity="0.15"
                stroke={color}
                strokeWidth="2"
                strokeLinejoin="round"
                className={styles.seriesPolygon}
              />
            );
          })}

          {/* Axis labels — rendered last so they appear above everything */}
          {axes.map((axis, i) => {
            const angle = angleForAxis(i, n);
            const labelR = R + 20;
            const [x, y] = polarToCartesian(labelR, angle);

            let anchor: 'start' | 'middle' | 'end' = 'middle';
            if (Math.cos(angle) > 0.1) anchor = 'start';
            else if (Math.cos(angle) < -0.1) anchor = 'end';

            return (
              <text
                key={axis}
                x={x}
                y={y}
                textAnchor={anchor}
                dominantBaseline="middle"
                className={styles.axisLabel}
              >
                {axis}
              </text>
            );
          })}
        </svg>

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
      </div>
    );
  },
);

RadarChart.displayName = 'RadarChart';
export { RadarChart };
