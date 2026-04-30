# Responsive design

## Breakpoints

The design system uses four breakpoints:

| Name | Value | Typical target |
|---|---|---|
| `sm` | 480px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |

CSS Custom Properties cannot be used inside `@media` queries, so the breakpoints are reference values only. Use them directly in your CSS:

```css
.my-layout {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .my-layout {
    grid-template-columns: 1fr 1fr;
  }
}
```

## Page layout with Navbar and Sidebar

`Navbar` and `Sidebar` are designed to compose into a standard application shell. `Sidebar` automatically offsets its top position by `--ds-layout-navbar-height` so the two components never overlap.

```tsx
import { Navbar, Sidebar } from '@aseguragonzalez/ui';

function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Navbar
        logo={<Logo />}
        actions={<Avatar name="Jane Smith" />}
      />
      <Sidebar
        collapsed={collapsed}
        onCollapse={() => setCollapsed(c => !c)}
        nav={<SidebarNav />}
        footer={<UserMenu />}
      />
      <main style={{
        marginLeft: collapsed
          ? 'var(--ds-layout-sidebar-width-collapsed)'
          : 'var(--ds-layout-sidebar-width)',
        marginTop: 'var(--ds-layout-navbar-height)',
        padding: 'var(--ds-space-6)',
      }}>
        {children}
      </main>
    </>
  );
}
```

### Mobile: hiding the Sidebar

On small screens, the Sidebar typically becomes a drawer or is hidden behind a hamburger menu. Drive this with a media query and a state flag:

```tsx
const [mobileOpen, setMobileOpen] = useState(false);
const isMobile = useMediaQuery('(max-width: 767px)');

<Sidebar
  collapsed={isMobile ? !mobileOpen : collapsed}
  style={isMobile && !mobileOpen ? { transform: 'translateX(-100%)' } : undefined}
/>
```

Alternatively, render no Sidebar on mobile and move navigation into the Navbar's actions slot.

## Structural layout tokens

Adjust these tokens in your theme to change the global layout proportions:

```css
:root {
  --ds-layout-navbar-height:           3.5rem;   /* 56px */
  --ds-layout-sidebar-width:           15rem;    /* 240px */
  --ds-layout-sidebar-width-collapsed: 3.5rem;   /*  56px */
}
```

Any component or layout rule that references these tokens will update automatically.

## DataTable on small screens

`DataTable` renders a standard `<table>`. On narrow viewports, wide tables overflow horizontally. Wrap the table in a scrollable container:

```tsx
<div style={{ overflowX: 'auto' }}>
  <DataTable columns={columns} data={rows} />
</div>
```

For mobile-first designs, consider showing fewer columns at smaller breakpoints by hiding non-essential columns via CSS:

```css
@media (max-width: 767px) {
  .col-secondary {
    display: none;
  }
}
```

Pass the class name via the column definition's `headerClassName` / `cellClassName` props.

## Responsive typography

The design system's font size tokens are fixed values (not fluid/clamp). For pages that need scaling typography, apply `clamp()` to the token:

```css
:root {
  --ds-font-size-md: clamp(0.875rem, 1vw + 0.5rem, 1rem);
}
```

Use `Heading` with the `size` prop to visually scale headings without changing their semantic level:

```tsx
// Large heading on desktop, medium on mobile
<Heading level={1} size={isMobile ? '2xl' : '4xl'}>
  Dashboard
</Heading>
```

## Touch targets

All interactive elements (buttons, checkboxes, toggles, radio buttons) have a minimum height of 44px to meet the WCAG 2.5.5 target size guideline. Do not reduce their size on mobile through CSS overrides.

## Charts on small screens

Chart components (`BarChart`, `LineChart`, `DonutChart`, `RadarChart`, `ScatterPlot`) are SVG-based and scale to their container's width. Place them in a container with a `min-width` to prevent them from becoming too small to read:

```tsx
<div style={{ minWidth: '320px', overflowX: 'auto' }}>
  <BarChart data={data} />
</div>
```

On very narrow screens, consider rendering a summary table as a fallback instead of a chart.
