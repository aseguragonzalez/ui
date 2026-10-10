# Contributing

## Setup

Development happens inside the devcontainer — see [Development environment](../CONTRIBUTING.md#development-environment).

```bash
git clone https://github.com/aseguragonzalez/ui.git
cd ui
devcontainer up --workspace-folder .
devcontainer exec --workspace-folder . npm run dev   # Storybook → http://localhost:6006
```

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Storybook dev server on port 6006 |
| `npm test` | Run unit + axe tests (Vitest) |
| `npm run test:watch` | Watch mode |
| `npm run test:storybook` | Run Storybook interaction tests |
| `npm run test:all` | All test projects |
| `npm run test:coverage` | Coverage report |
| `npm run build` | Generate `dist/` (ESM + CJS + CSS) |
| `npm run build:storybook` | Static Storybook build |
| `npm run types:css` | Regenerate CSS Module `.d.ts` files |
| `npm run lint` | ESLint |

## Architecture

```
Design Tokens (CSS Custom Properties)
  └── Primitives  (wrap HTML5 elements — no label/hint/error logic)
        └── Components / Composites  (Label + Input + Hint + ErrorMessage)
              └── Patterns  (LoginForm, RegistrationForm…)
```

**Dependency rule:** lower layers never import from higher layers. Primitives never import from `components/`. Components never import from `patterns/`.

### Layer responsibilities

**`src/tokens/`** — single `tokens.css` file with the full primitive scale and all semantic tokens for light and dark themes.

**`src/primitives/`** — one folder per primitive. Each folder contains the component, its CSS Module, test and stories. Primitives wrap a single HTML element, expose all native props via `React.ComponentPropsWithoutRef`, and forward refs where applicable. They accept `hasError` and `disabled` but do not render labels or error messages.

**`src/components/`** — composite field components and layout/data/chart components. Composites use the `useFieldIds` hook (in `src/components/shared/`) to generate stable, unique IDs for ARIA wiring.

**`src/patterns/`** — full page patterns composed from components. A pattern consumers reuse, such as `AuthLayout`, is exported from `src/index.ts` like any component; example compositions that exist only as stories (`RegistrationForm`, `ExampleApp`) are not exported.

## Adding a new primitive

1. Create `src/primitives/MyWidget/MyWidget.tsx`
2. Create `src/primitives/MyWidget/MyWidget.module.css` and run `npm run types:css` to generate `MyWidget.module.css.d.ts`
3. Create `src/primitives/MyWidget/MyWidget.test.tsx`
4. Export the component and its types directly from `src/index.ts` (there is no per-folder `index.ts`):
   ```ts
   export { MyWidget } from './primitives/MyWidget/MyWidget';
   export type { MyWidgetProps } from './primitives/MyWidget/MyWidget';
   ```
5. Create `src/primitives/MyWidget/MyWidget.stories.tsx`

### Primitive checklist

- [ ] Extends `React.ComponentPropsWithoutRef<'element'>` (spread all native props)
- [ ] Forwards ref with `forwardRef`
- [ ] Uses only semantic tokens (`--ds-color-*`, `--ds-space-*`) in CSS — never primitive palette values
- [ ] Supports `disabled` state visually and via the native attribute
- [ ] Has a `:focus-visible` style using `--ds-focus-ring-*` tokens
- [ ] Respects `prefers-reduced-motion` if it has animations
- [ ] Test includes a `jest-axe` accessibility audit

### Accessibility test template

```tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

it('has no axe violations', async () => {
  const { container } = render(<MyWidget aria-label="Example" />);
  expect(await axe(container)).toHaveNoViolations();
});
```

## Adding a new composite

Composites live in `src/components/<ComponentName>/`, with the same files as a primitive (`MyField.tsx`, `MyField.module.css` and its generated `.d.ts`, `MyField.test.tsx`, `MyField.stories.tsx`). Export the component and its types directly from `src/index.ts`, in the components section:

```ts
export { MyField } from './components/MyField/MyField';
export type { MyFieldProps } from './components/MyField/MyField';
```

A pattern in `src/patterns/<PatternName>/` follows the same layout and, when consumers reuse it, the same direct export from `src/index.ts`.

Composites use `useFieldIds` to generate `id`, `hintId`, and `errorId`:

```tsx
import { useFieldIds } from '../shared/useFieldIds';

export function MyField({ label, hint, error, required, inputId, ...inputProps }: MyFieldProps) {
  const { id, hintId, errorId, describedBy } = useFieldIds({ inputId, hint, error });
  return (
    <div>
      <Label htmlFor={id} required={required}>{label}</Label>
      <MyInput
        id={id}
        hasError={Boolean(error)}
        required={required}
        aria-required={required}
        aria-describedby={describedBy}
        {...inputProps}
      />
      {error ? (
        <ErrorMessage id={errorId}>{error}</ErrorMessage>
      ) : hint ? (
        <Hint id={hintId}>{hint}</Hint>
      ) : null}
    </div>
  );
}
```

## CSS conventions

- Use CSS Modules for all component styles (`.module.css`)
- Reference only semantic tokens — never hardcode colors, spacing, or font sizes
- Name classes in camelCase (`.rootElement`, `.hasError`)
- Run `npm run types:css` after adding new class names to regenerate `.d.ts` files

## Testing standards

Every component must have:

- Rendering tests (default props, key variants)
- ARIA attribute assertions (correct `role`, `aria-*` attributes)
- Keyboard interaction tests for interactive components
- An axe accessibility audit

Run a single component's tests:

```bash
npx vitest run src/primitives/Button
```

## Storybook

Every component needs a stories file with:

- A `Default` story showing the minimal usage
- Stories covering key variants and states (error, disabled, loading…)
- The `autodocs` tag on the meta export so documentation is auto-generated

Dark mode is available in the Storybook toolbar. The accessibility addon runs in `error` mode — violations appear as errors in the A11y tab.

## Package output

```
dist/
  index.js      ESM entry, re-exporting one module per component
  index.cjs     CommonJS entry, same layout (*.cjs)
  index.d.ts    TypeScript declarations
  index.css     Tokens + base styles + all component styles
  tokens.css    CSS Custom Properties only
```

Build with `npm run build`. The build runs `types:css` first (CSS Module declarations), then `tsc` (type check), then Vite (bundling), then a declaration-only `tsc` pass that emits `index.d.ts`, and finally copies `tokens.css` into `dist/`. The stages after Vite are what produce the published entry points, so a Vite-only build is not a complete package build.

The JavaScript is emitted one module per source file (`preserveModules`) and `package.json` declares `"sideEffects": ["**/*.css"]`, so consumers only bundle the components they import. After building, `node scripts/verify-package.mjs` checks the packed tarball and that both entry points load, and `node scripts/check-tree-shaking.mjs` bundles a fixture that imports only `Button` and fails if other components end up in it. CI runs both.
