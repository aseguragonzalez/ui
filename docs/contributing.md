# Contributing

## Setup

```bash
git clone <repo>
cd design-system
npm install
npm run dev   # Storybook → http://localhost:6006
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

**`src/primitives/`** — one folder per primitive. Each folder contains the component, CSS Module, and test file. Primitives wrap a single HTML element, expose all native props via `React.ComponentPropsWithoutRef`, and forward refs where applicable. They accept `hasError` and `disabled` but do not render labels or error messages.

**`src/components/`** — composite field components and layout/data/chart components. Composites use the `useFieldIds` hook (in `src/components/shared/`) to generate stable, unique IDs for ARIA wiring.

**`src/patterns/`** — full page patterns composed from components. Not exported as individual components.

## Adding a new primitive

1. Create `src/primitives/MyWidget/MyWidget.tsx`
2. Create `src/primitives/MyWidget/MyWidget.module.css`
3. Create `src/primitives/MyWidget/MyWidget.test.tsx`
4. Export from `src/primitives/MyWidget/index.ts` and add to `src/index.ts`
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

Composites live in `src/components/<ComponentName>/`. They use `useFieldIds` to generate `id`, `hintId`, and `errorId`:

```tsx
import { useFieldIds } from '../shared/useFieldIds';

export function MyField({ label, hint, errorMessage, required, ...inputProps }: MyFieldProps) {
  const { fieldId, hintId, errorId } = useFieldIds();
  return (
    <div>
      <Label htmlFor={fieldId} required={required}>{label}</Label>
      <MyInput
        id={fieldId}
        aria-describedby={[hint && hintId, errorMessage && errorId].filter(Boolean).join(' ') || undefined}
        aria-invalid={!!errorMessage}
        aria-required={required}
        {...inputProps}
      />
      {hint && <Hint id={hintId}>{hint}</Hint>}
      {errorMessage && <ErrorMessage id={errorId}>{errorMessage}</ErrorMessage>}
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
  index.js      ESM bundle
  index.cjs     CommonJS bundle
  index.d.ts    TypeScript declarations
  index.css     Tokens + all component styles
  tokens.css    CSS Custom Properties only
```

Build with `npm run build`. The build runs `types:css` first (CSS Module declarations), then `tsc` (TypeScript), then Vite (bundling).
