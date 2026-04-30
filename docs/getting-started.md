# Getting started

## Prerequisites

- React 18 or 19
- A bundler that handles CSS imports (Vite, webpack, Next.js, etc.)

## Installation

```bash
npm install @aseguragonzalez/ui
```

## Import the stylesheet

Add this import once, at your application entry point (e.g. `main.tsx` or `_app.tsx`). It includes design tokens and all component styles:

```tsx
import '@aseguragonzalez/ui/index.css';
```

If you only want the CSS Custom Properties and plan to write your own component styles on top, import just the tokens:

```css
@import '@aseguragonzalez/ui/tokens.css';
```

## Wrap with ToastProvider

If your application uses toast notifications, wrap your root with `ToastProvider`. This can be placed at the top level — it renders a portal outside your component tree:

```tsx
import { ToastProvider } from '@aseguragonzalez/ui';
import '@aseguragonzalez/ui/index.css';

function App() {
  return (
    <ToastProvider>
      <Router />
    </ToastProvider>
  );
}
```

Components that do not use toasts do not require this wrapper.

## Your first form

Use **composite** components (`TextField`, `SelectField`, etc.) rather than bare primitives. Composites wire up the label, hint, error message, and ARIA attributes automatically:

```tsx
import { useState } from 'react';
import { Button, TextField, SelectField } from '@aseguragonzalez/ui';

function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Enter a valid email address.');
      return;
    }
    // submit…
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        errorMessage={error}
        required
      />
      <SelectField
        label="Role"
        value={role}
        onChange={e => setRole(e.target.value)}
      >
        <option value="">Select a role…</option>
        <option value="admin">Admin</option>
        <option value="viewer">Viewer</option>
      </SelectField>
      <Button variant="primary" type="submit">Create account</Button>
    </form>
  );
}
```

## TypeScript

The library ships with full TypeScript definitions. All component props extend their underlying HTML element's props, so any native attribute is valid:

```tsx
// These are all type-safe
<Button variant="primary" disabled aria-label="Save changes">Save</Button>
<TextField label="Search" autoComplete="email" spellCheck={false} />
```

CSS Modules have generated `.d.ts` files — you will not see type errors from style imports.

## Package exports

| Import path | What you get |
|---|---|
| `@aseguragonzalez/ui` | All components and hooks (ESM + CJS) |
| `@aseguragonzalez/ui/index.css` | Tokens + all component styles |
| `@aseguragonzalez/ui/tokens.css` | CSS Custom Properties only |

## Next steps

- [Theming](theming.md) — adjust colors, typography, and spacing to match your brand
- [Accessibility](accessibility.md) — patterns and guidelines to keep your UI inclusive
- [UX guidelines](ux-guidelines.md) — when to use which component and why
