# Theming

The design system uses a two-layer CSS Custom Properties architecture. Understanding the layers is the key to customizing correctly.

## Token architecture

```
Primitive scale  →  Semantic tokens  →  Components
(never override)    (override these)    (reference only semantics)
```

**Primitive tokens** (`--ds-palette-*`, `--ds-space-*`, `--ds-font-size-*`, etc.) are the raw scale — fixed numeric values like `#3b82f6` or `0.5rem`. Components never reference them directly.

**Semantic tokens** (`--ds-color-action-primary`, `--ds-color-text-default`, etc.) describe _intent_ and map to primitives. These are the only ones you should override.

This means a single override like `--ds-color-action-primary: #7c3aed` automatically updates every button, checkbox, focus ring, and link in the UI.

## Creating your brand theme

Create a CSS file (e.g. `brand-theme.css`) and import it **after** the design system stylesheet:

```css
/* brand-theme.css */
:root {
  /* Brand color — replaces the default blue across all components */
  --ds-color-action-primary:          #7c3aed;   /* violet-600 */
  --ds-color-action-primary-hover:    #6d28d9;   /* violet-700 */
  --ds-color-action-primary-active:   #5b21b6;   /* violet-800 */
  --ds-color-action-primary-subtle:   #f5f3ff;   /* violet-50  */
  --ds-color-action-focus-ring:       #7c3aed;

  /* Match input focus border to brand color */
  --ds-color-input-border-focus:      #7c3aed;
  --ds-color-border-focus:            #7c3aed;

  /* Custom typography */
  --ds-font-family-base: 'Inter', system-ui, sans-serif;
}
```

```tsx
// main.tsx
import '@aseguragonzalez/ui/index.css';
import './brand-theme.css';   // always after the DS stylesheet
```

That is all that is required. No build-time configuration, no class overrides.

## Semantic token reference

### Surfaces

| Token | Default (light) | Usage |
|---|---|---|
| `--ds-color-bg-page` | `#f9fafb` | Page background |
| `--ds-color-bg-surface` | `#ffffff` | Cards, panels, modals |
| `--ds-color-bg-subtle` | `#f3f4f6` | Hover states, table rows |
| `--ds-color-bg-muted` | `#e5e7eb` | Dividers, chart grid lines |

### Text

| Token | Default (light) | Usage |
|---|---|---|
| `--ds-color-text-default` | `#111827` | Body copy, labels |
| `--ds-color-text-muted` | `#6b7280` | Hints, captions, placeholders |
| `--ds-color-text-disabled` | `#4b5563` | Disabled state text |
| `--ds-color-text-on-action` | `#ffffff` | Text on primary buttons |
| `--ds-color-text-error` | `#b91c1c` | Error messages |
| `--ds-color-text-success` | `#15803d` | Success messages |
| `--ds-color-text-warning` | `#a16207` | Warning messages |
| `--ds-color-text-info` | `#1d4ed8` | Info messages |

### Action (primary interactive color)

| Token | Usage |
|---|---|
| `--ds-color-action-primary` | Default state of buttons, checkboxes, toggles, links |
| `--ds-color-action-primary-hover` | Hover state |
| `--ds-color-action-primary-active` | Pressed / active state |
| `--ds-color-action-primary-subtle` | Soft background (e.g. selected row, badge fill) |
| `--ds-color-action-focus-ring` | Keyboard focus ring color |

### Borders

| Token | Usage |
|---|---|
| `--ds-color-border-default` | Default input and container borders |
| `--ds-color-border-strong` | Emphasized borders |
| `--ds-color-border-focus` | Input focus border |
| `--ds-color-border-error` | Error state border |
| `--ds-color-border-disabled` | Disabled state border |

### Form inputs

| Token | Usage |
|---|---|
| `--ds-color-input-bg` | Input background |
| `--ds-color-input-bg-disabled` | Disabled input background |
| `--ds-color-input-border` | Resting border |
| `--ds-color-input-border-hover` | Hover border |
| `--ds-color-input-border-focus` | Focus border |
| `--ds-color-input-border-error` | Error border |
| `--ds-color-input-text` | Input text color |
| `--ds-color-input-placeholder` | Placeholder color |

### Typography

| Token | Default | Usage |
|---|---|---|
| `--ds-font-family-base` | System UI stack | Body and UI text |
| `--ds-font-family-mono` | System mono stack | Code, numeric data |

Font sizes (`--ds-font-size-xs` through `--ds-font-size-4xl`) and font weights are available but rarely need overriding.

### Spacing

The spacing scale (`--ds-space-1` through `--ds-space-16`) is based on a 4px grid. Override with caution — these affect all internal component padding and gaps.

### Border radius

| Token | Value | Usage |
|---|---|---|
| `--ds-radius-sm` | `0.25rem` | Badges, tags |
| `--ds-radius-md` | `0.375rem` | Inputs, buttons |
| `--ds-radius-lg` | `0.5rem` | Cards, panels |
| `--ds-radius-xl` | `0.75rem` | Modals |
| `--ds-radius-full` | `9999px` | Pills, avatars |

Overriding `--ds-radius-md` and `--ds-radius-lg` is a quick way to shift from rounded to square feel across the entire system.

### Layout structural tokens

| Token | Default | Usage |
|---|---|---|
| `--ds-layout-navbar-height` | `3.5rem` | Navbar height, used by Sidebar for offset |
| `--ds-layout-sidebar-width` | `15rem` | Sidebar expanded width |
| `--ds-layout-sidebar-width-collapsed` | `3.5rem` | Sidebar collapsed (icon-only) width |

### Chart colors

| Token | Default |
|---|---|
| `--ds-chart-1` | Primary blue |
| `--ds-chart-2` | Emerald |
| `--ds-chart-3` | Amber |
| `--ds-chart-4` | Violet |
| `--ds-chart-5` | Red |
| `--ds-chart-6` | Cyan |

Override these to match your data visualization palette.

## Dark mode

Dark theme is applied automatically when the OS is set to dark mode. To force it with an explicit toggle, set `data-theme="dark"` on `<html>` (or any container):

```ts
// Toggle dark mode programmatically
document.documentElement.setAttribute('data-theme', 'dark');

// Revert to OS preference
document.documentElement.removeAttribute('data-theme');

// Force light even when OS is dark
document.documentElement.setAttribute('data-theme', 'light');
```

The dark theme re-maps semantic tokens only. Your brand overrides in `:root` apply to the light theme. To also override specific tokens in dark mode:

```css
:root {
  --ds-color-action-primary: #7c3aed;
}

[data-theme="dark"] {
  --ds-color-action-primary: #a78bfa;   /* lighter shade for dark backgrounds */
}
```

## What not to override

- **Primitive palette tokens** (`--ds-palette-*`) — components do not reference them, so overriding them has no effect.
- **Component CSS class names** — internal class names are not part of the public API and may change between versions.
- **Z-index scale** — only override `--ds-z-*` tokens if you have a known stacking context conflict with a third-party library.
