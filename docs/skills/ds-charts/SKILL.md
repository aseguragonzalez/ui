---
name: ds-charts
description: Build a chart or metrics dashboard. Use when asked for a bar chart, line chart, donut chart, radar chart, scatter plot, or a dashboard with multiple charts.
compatibility: Requires @aseguragonzalez/ui. React 18+.
metadata:
  layer: ui
  pattern: data-visualization
allowed-tools: Read Glob Write Edit
---

Build charts using the design system's SVG-based chart components. Each chart is self-contained — it renders its own SVG, legend, and empty state. All charts use `--ds-chart-1` through `--ds-chart-6` tokens for colors by default.

## Step 1 — Choose the right chart type

| Chart | Best for |
|---|---|
| `BarChart` | Comparing discrete categories or groups across one or more series |
| `LineChart` | Trends over time, one or more series (optionally with area fill) |
| `DonutChart` | Part-to-whole proportions (up to ~6 segments) |
| `RadarChart` | Multi-dimensional comparison of one or more entities |
| `ScatterPlot` | Correlation between two numeric variables |

## Step 2 — Shape the data

Each chart has its own data types. Match them exactly.

### BarChart and LineChart (same series shape)

```ts
// BarChart
interface BarChartSeries {
  id: string;
  label: string;
  data: { label: string; value: number }[];
  color?: string;          // overrides --ds-chart-N for this series
}

// LineChart adds:
interface LineChartSeries extends BarChartSeries {
  showArea?: boolean;      // per-series area fill override
}

// LineChart also accepts a global prop:
showArea?: boolean         // applies to all series that don't set their own showArea
```

All series in a single BarChart or LineChart **must share the same `data[i].label` values** — the component uses `series[0].data` to derive the X-axis labels.

### DonutChart

```ts
interface DonutSegment {
  label: string;
  value: number;
  color?: string;
}
// Props:
segments: DonutSegment[]
centerLabel?: string       // large text in the donut center (e.g. total value)
centerSubLabel?: string    // small text below centerLabel (e.g. "total")
```

### RadarChart

```ts
interface RadarSeries {
  id: string;
  label: string;
  values: number[];        // one value per axis — length must equal axes.length
  color?: string;
}
// Props:
axes: string[]             // axis names, 3–8 recommended
series: RadarSeries[]
maxValue?: number          // defaults to max across all series
```

### ScatterPlot

```ts
interface ScatterDatum {
  x: number;
  y: number;
  label?: string;          // shown in the point tooltip
}
interface ScatterSeries {
  id: string;
  label: string;
  data: ScatterDatum[];
  color?: string;
}
```

## Step 3 — Pass `title` (always required)

`title` is used as the SVG `<title>` element — it is the accessible name for screen readers. Make it descriptive:

```tsx
<BarChart title="Nuevos registros por mes — 2024" series={series} />
```

## Step 4 — Handle empty state

All charts render an empty state automatically when `data` / `segments` / `series` is empty or all values are zero. No extra code needed.

## Step 5 — Write the files

Read asset templates for concrete examples:
- `assets/bar_chart.tsx`
- `assets/line_chart.tsx`
- `assets/donut_chart.tsx`
- `assets/radar_chart.tsx`
- `assets/dashboard.tsx` — multiple charts composed in a grid

## Gotchas

- **`title` is required** on every chart — never omit it. It provides the accessible label.
- **Same labels across series:** For BarChart and LineChart, all series must have identical labels in the same order. If a series is missing a data point for a label, add `{ label, value: 0 }`.
- **RadarChart `values` length must equal `axes` length.** A mismatch causes incorrect polygon rendering with no runtime error.
- **Custom colors** go on the series/segment `color` prop, not via CSS. Use CSS custom properties (e.g. `"var(--brand-blue)"`) or hex values.
- **DonutChart `centerLabel`** is ideal for a KPI display (e.g. `centerLabel="1.284"` + `centerSubLabel="conversiones"`).
- Charts are **not responsive by default** — they use a fixed SVG `viewBox`. Wrap in a container with `width: 100%` so the SVG scales with the layout.
- `className` on all charts applies to the outer wrapper `<div>` (or `<svg>` for DonutChart) — use it to control sizing.
