import { forwardRef, useId } from 'react';
import styles from './DonutChart.module.css';

export interface DonutSegment {
  label: string;
  value: number;
  color?: string;
}

export interface DonutChartProps {
  title: string;
  segments: DonutSegment[];
  centerLabel?: string;
  centerSubLabel?: string;
  className?: string;
}

const DEFAULT_COLORS = [
  'var(--ds-chart-1)',
  'var(--ds-chart-2)',
  'var(--ds-chart-3)',
  'var(--ds-chart-4)',
  'var(--ds-chart-5)',
  'var(--ds-chart-6)',
];

const CX = 100;
const CY = 100;
const R = 72;
const STROKE_W = 28;
const CIRCUMFERENCE = 2 * Math.PI * R;

const DonutChart = forwardRef<SVGSVGElement, DonutChartProps>(
  ({ title, segments, centerLabel, centerSubLabel, className }, ref) => {
    const titleId = useId();

    const total = segments.reduce((s, d) => s + d.value, 0);

    if (segments.length === 0 || total === 0) {
      return (
        <div className={[styles.empty, className ?? ''].filter(Boolean).join(' ')}>
          {title} — no data
        </div>
      );
    }

    let offset = 0;

    return (
      <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')}>
        <svg
          ref={ref}
          role="img"
          aria-labelledby={titleId}
          viewBox="0 0 200 200"
          className={styles.svg}
        >
          <title id={titleId}>{title}</title>

          {/* Track ring */}
          <circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke="var(--ds-chart-grid)"
            strokeWidth={STROKE_W}
          />

          {/* Segments */}
          {segments.map((seg, i) => {
            const dashLen = (seg.value / total) * CIRCUMFERENCE;
            const dashOffset = -offset;
            offset += dashLen;

            return (
              <circle
                key={seg.label}
                cx={CX}
                cy={CY}
                r={R}
                fill="none"
                stroke={seg.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]}
                strokeWidth={STROKE_W}
                strokeDasharray={`${dashLen} ${CIRCUMFERENCE - dashLen}`}
                strokeDashoffset={dashOffset}
                transform={`rotate(-90 ${CX} ${CY})`}
              >
                <title>{`${seg.label}: ${seg.value} (${Math.round((seg.value / total) * 100)}%)`}</title>
              </circle>
            );
          })}

          {/* Center label */}
          {centerLabel && (
            <text x={CX} y={CY - (centerSubLabel ? 8 : 0)} textAnchor="middle" dominantBaseline="middle" className={styles.centerLabel}>
              {centerLabel}
            </text>
          )}
          {centerSubLabel && (
            <text x={CX} y={CY + 16} textAnchor="middle" dominantBaseline="middle" className={styles.centerSubLabel}>
              {centerSubLabel}
            </text>
          )}
        </svg>

        {/* Legend */}
        <ul className={styles.legend} aria-label={`${title} legend`}>
          {segments.map((seg, i) => (
            <li key={seg.label} className={styles.legendItem}>
              <span
                className={styles.legendSwatch}
                style={{ background: seg.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length] }}
                aria-hidden="true"
              />
              <span className={styles.legendLabel}>{seg.label}</span>
              <span className={styles.legendValue}>
                {Math.round((seg.value / total) * 100)}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  },
);

DonutChart.displayName = 'DonutChart';
export { DonutChart };
