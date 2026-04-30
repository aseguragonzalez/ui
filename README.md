# Design System

Accessible, themeable React component library. WCAG 2.1 AA out of the box, zero runtime dependencies, CSS Custom Properties theming.

## Install

```bash
npm install @aseguragonzalez/ui
```

## Setup

Import the stylesheet once at your app entry point:

```tsx
import '@aseguragonzalez/ui/index.css';
```

Wrap your app with `ToastProvider` if you use toast notifications:

```tsx
import { ToastProvider } from '@aseguragonzalez/ui';

function App() {
  return (
    <ToastProvider>
      <YourApp />
    </ToastProvider>
  );
}
```

## Usage

```tsx
import { Button, TextField } from '@aseguragonzalez/ui';

function ContactForm() {
  return (
    <form>
      <TextField label="Name" placeholder="Your name" required />
      <TextField label="Email" type="email" />
      <Button variant="primary" type="submit">Send</Button>
    </form>
  );
}
```

## What's included

**Primitives** — atomic wrappers around HTML5 elements: `Button`, `TextInput`, `Checkbox`, `Select`, `Toggle`, `Heading`, `Text`, `Label`, `Alert`, `Badge`, `Spinner`, `ProgressBar`, `Tabs`, `Tooltip`, `Modal`, `Toast`, and more.

**Composites** — primitives combined with `Label`, `Hint`, and `ErrorMessage` for complete, accessible form fields: `TextField`, `TextAreaField`, `CheckboxField`, `SelectField`, `RadioGroup`, `ToggleField`, `PasswordField`, `DateField`, and more.

**Layout** — `Navbar`, `Sidebar`, `Breadcrumb`.

**Charts** — `BarChart`, `LineChart`, `DonutChart`, `ScatterPlot`, `RadarChart`.

**Data** — `DataTable` with generic typing, sorting, and pagination.

## Theming

Override semantic CSS Custom Properties to match your brand — no class overrides needed:

```css
:root {
  --ds-color-action-primary:       #7c3aed;
  --ds-color-action-primary-hover: #6d28d9;
  --ds-font-family-base:           'Inter', sans-serif;
}
```

See [docs/theming.md](docs/theming.md) for the full token reference.

## Documentation

| Guide | Description |
|---|---|
| [Getting started](docs/getting-started.md) | Installation, setup, first component |
| [Theming](docs/theming.md) | Customize with CSS Custom Properties |
| [Accessibility](docs/accessibility.md) | WCAG 2.1 AA best practices |
| [Responsive design](docs/responsive-design.md) | Breakpoints, layout, mobile patterns |
| [UX guidelines](docs/ux-guidelines.md) | Forms, feedback, modals, tooltips |
| [Contributing](docs/contributing.md) | Architecture, scripts, adding components |

## Storybook

Every component has interactive controls, auto-generated docs, and a built-in accessibility audit:

```bash
npm run dev   # → http://localhost:6006
```

## Key principles

- **Accessibility first** — axe-core runs on every test in `error` mode; violations fail the suite
- **Zero runtime dependencies** — only `react` and `react-dom` as peer dependencies
- **CSS Custom Properties only** — theming never requires class overrides or build-time configuration
- **Strict TypeScript** — all public APIs fully typed; CSS Modules have generated `.d.ts` files
