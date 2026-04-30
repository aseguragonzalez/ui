import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'Foundation/Tokens',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj;

/* ------------------------------------------------------------------ */

type SwatchProps = { token: string; label?: string };

function Swatch({ token, label }: SwatchProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <div
        style={{
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: '0.375rem',
          backgroundColor: `var(${token})`,
          border: '1px solid rgba(0,0,0,0.08)',
          flexShrink: 0,
        }}
      />
      <div>
        <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--ds-color-text-default)' }}>
          {token}
        </div>
        {label && (
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-color-text-muted)' }}>{label}</div>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <div
        style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: 'var(--ds-color-text-muted)',
          marginBottom: '0.75rem',
        }}
      >
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export const PaletasBrand: Story = {
  name: 'Paleta — Brand (Navy)',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.5rem' }}>
      {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((n) => (
        <Swatch key={n} token={`--ds-palette-brand-${n}`} />
      ))}
    </div>
  ),
};

export const PaletasAccent: Story = {
  name: 'Paleta — Accent (Teal)',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.5rem' }}>
      {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((n) => (
        <Swatch key={n} token={`--ds-palette-accent-${n}`} />
      ))}
    </div>
  ),
};

export const PaletasNeutral: Story = {
  name: 'Paleta — Neutral',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.5rem' }}>
      {[0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((n) => (
        <Swatch key={n} token={`--ds-palette-neutral-${n}`} />
      ))}
    </div>
  ),
};

export const PaletasStatus: Story = {
  name: 'Paleta — Status',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.5rem' }}>
      {(['success', 'warning', 'error', 'info'] as const).flatMap((s) =>
        [100, 500, 700].map((n) => (
          <Swatch key={`${s}-${n}`} token={`--ds-palette-${s}-${n}`} />
        )),
      )}
    </div>
  ),
};

export const TokensSemanticos: Story = {
  name: 'Semantic tokens — Color',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 2rem' }}>
      <Section title="Surfaces">
        <Swatch token="--ds-color-bg-page" label="Page background" />
        <Swatch token="--ds-color-bg-surface" label="Cards, panels" />
        <Swatch token="--ds-color-bg-subtle" label="Subtle backgrounds" />
        <Swatch token="--ds-color-bg-muted" label="Muted backgrounds" />
        <Swatch token="--ds-color-bg-elevated" label="Elevated surfaces" />
        <Swatch token="--ds-color-bg-overlay" label="Modals, dropdowns" />
      </Section>

      <Section title="Text">
        <Swatch token="--ds-color-text-default" label="Primary text" />
        <Swatch token="--ds-color-text-muted" label="Secondary text" />
        <Swatch token="--ds-color-text-disabled" label="Disabled" />
        <Swatch token="--ds-color-text-accent" label="Teal" />
        <Swatch token="--ds-color-text-error" label="Error" />
        <Swatch token="--ds-color-text-success" label="Success" />
        <Swatch token="--ds-color-text-warning" label="Warning" />
        <Swatch token="--ds-color-text-info" label="Info" />
      </Section>

      <Section title="Action — Brand">
        <Swatch token="--ds-color-action-primary" label="Default" />
        <Swatch token="--ds-color-action-primary-hover" label="Hover" />
        <Swatch token="--ds-color-action-primary-active" label="Active" />
        <Swatch token="--ds-color-action-primary-subtle" label="Subtle" />
        <Swatch token="--ds-color-action-focus-ring" label="Focus ring" />
      </Section>

      <Section title="Action — Accent">
        <Swatch token="--ds-color-action-accent" label="Default" />
        <Swatch token="--ds-color-action-accent-hover" label="Hover" />
        <Swatch token="--ds-color-action-accent-active" label="Active" />
        <Swatch token="--ds-color-action-accent-subtle" label="Subtle" />
      </Section>

      <Section title="Action — Danger">
        <Swatch token="--ds-color-action-danger" label="Default" />
        <Swatch token="--ds-color-action-danger-hover" label="Hover" />
      </Section>

      <Section title="Borders">
        <Swatch token="--ds-color-border-default" label="Default" />
        <Swatch token="--ds-color-border-strong" label="Strong" />
        <Swatch token="--ds-color-border-focus" label="Focus" />
        <Swatch token="--ds-color-border-accent" label="Accent" />
        <Swatch token="--ds-color-border-error" label="Error" />
      </Section>

      <Section title="Status backgrounds">
        <Swatch token="--ds-color-bg-error" label="Error" />
        <Swatch token="--ds-color-bg-success" label="Success" />
        <Swatch token="--ds-color-bg-warning" label="Warning" />
        <Swatch token="--ds-color-bg-info" label="Info" />
        <Swatch token="--ds-color-bg-accent" label="Accent" />
      </Section>
    </div>
  ),
};

export const SeriesGraficas: Story = {
  name: 'Tokens — Chart series',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <Swatch key={n} token={`--ds-chart-${n}`} label={`Series ${n}`} />
      ))}
    </div>
  ),
};
