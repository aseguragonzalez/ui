# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev                                   # Storybook dev server → http://localhost:6006
npm test                                      # Unit + axe tests (jsdom)
npm run test:watch                            # Unit tests in watch mode
npm run test:storybook                        # Storybook interaction tests (Playwright/Chromium)
npm run test:all                              # All test projects
npx vitest run src/primitives/Button          # Single component tests
npm run build                                 # types:css → tsc → vite (outputs dist/)
npm run lint                                  # ESLint (flat config)
npm run types:css                             # Regenerate CSS Module .d.ts files after editing .module.css
```

Run `types:css` whenever a CSS Module class name is added or removed — TypeScript will error until the `.d.ts` is regenerated.

## Architecture

### Layer hierarchy

```
src/tokens/          CSS Custom Properties (primitive scale + semantic tokens)
src/primitives/      Atomic wrappers around HTML5 elements
src/components/      Composites (field = primitive + Label + Hint + ErrorMessage) + layout/charts
src/patterns/        Full-page compositions (not exported individually)
```

**Hard rule:** lower layers never import from higher ones. Primitives never import from `components/`. Violating this breaks the dependency graph.

### Primitives

One folder per component (`Button/Button.tsx`, `Button.module.css`, `Button.test.tsx`, `Button.stories.tsx`). Every primitive:

- Extends `React.ComponentPropsWithoutRef<'element'>` and spreads all native props
- Uses `forwardRef`
- References only semantic tokens (`--ds-color-*`, `--ds-space-*`) in CSS — never the primitive palette (`--ds-palette-*`)
- Has a `:focus-visible` rule using `--ds-focus-ring-width`, `--ds-focus-ring-offset`, `--ds-focus-ring-color`

### Composites (form fields)

Every field composite (`TextField`, `SelectField`, `RadioGroup`, etc.) uses `useFieldIds` from `src/components/shared/useFieldIds.ts`:

```ts
const { id, hintId, errorId, describedBy } = useFieldIds({ inputId, hint, errorMessage });
```

This hook wraps React's `useId()` to auto-generate stable IDs and derives `aria-describedby` by joining `hintId` and `errorId`. The pattern ensures consistent ARIA wiring across all field composites without manual ID management.

Fields show either `hint` or `errorMessage`, never both simultaneously. Error takes precedence.

### CSS token strategy

Two layers in `src/tokens/tokens.css`:

1. **Primitive scale** (`--ds-palette-*`, `--ds-space-*`, `--ds-font-size-*`, etc.) — raw values that components never reference directly.
2. **Semantic tokens** (`--ds-color-action-primary`, `--ds-color-input-border`, etc.) — map to primitives and are the only tokens components use.

Consumers override semantic tokens in `:root` (after importing the stylesheet) to theme the entire library. Overriding primitive scale tokens has no effect on components.

### CSS Modules

Class names are typed. After editing any `.module.css` file, run `npm run types:css` or the build will fail. Class composition is done in TypeScript (array filter + join), not CSS nesting.

### Test setup

Two Vitest projects defined in `vite.config.ts`:
- **unit** — jsdom environment, runs `*.test.tsx` files
- **storybook** — Playwright/Chromium, runs Storybook interaction tests

`src/test/setup.ts` configures jest-axe with color-contrast checks enabled. Every component test suite must include an axe audit for each significant state. Axe runs in `error` mode — violations fail the suite, they do not warn.

### Accessibility conventions

- Default labels and UI strings are in **English** (`"Loading..."`, `"Close alert"`, etc.). All stories and documentation examples must also be in English.
- `ToastProvider` must wrap the app root to use `useToast`. It injects an `aria-live` region via a portal.
- `Modal` traps focus and restores it on close — do not manage focus manually inside modals.
- `ErrorMessage` does not use `role="alert"`. Errors are surfaced via `aria-invalid` + `aria-describedby` on the input.

### Build output

```
dist/index.js       ESM
dist/index.cjs      CommonJS
dist/index.d.ts     TypeScript declarations
dist/index.css      Tokens + all component styles
dist/tokens.css     CSS Custom Properties only
```

`cssCodeSplit: false` in Vite config — all styles land in a single `index.css`. React and react-dom are externalized (peer dependencies).
