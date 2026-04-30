# Accessibility

Every component targets **WCAG 2.1 Level AA**. axe-core runs on every test suite in `error` mode, meaning any accessibility violation fails the test — not just warns.

This document explains the patterns built into the library and what you need to do as a consumer to keep your UI accessible.

## Use composites for forms

The most impactful decision you can make is using **composite components** instead of bare primitives for form fields.

```tsx
// Bad — you are responsible for all ARIA wiring
<div>
  <Label htmlFor="email">Email</Label>
  <TextInput id="email" aria-describedby="email-hint email-error" aria-invalid={!!error} />
  <Hint id="email-hint">We will never share your email.</Hint>
  <ErrorMessage id="email-error">{error}</ErrorMessage>
</div>

// Good — all ARIA wiring is automatic
<EmailField
  label="Email"
  hint="We will never share your email."
  errorMessage={error}
/>
```

Composites (`TextField`, `EmailField`, `CheckboxField`, `RadioGroup`, `SelectField`, `ToggleField`, `PasswordField`, `DateField`, etc.) automatically:

- Generate unique `id`, `htmlFor`, `aria-describedby`, `aria-invalid`, and `aria-required`
- Link hint and error message via `aria-describedby`
- Mark required fields with `aria-required="true"` and a visible asterisk (`aria-hidden` on the asterisk)

## Labels are mandatory

Every form field must have a visible label. Placeholder text is not a substitute — it disappears on input and is not reliably announced by screen readers.

```tsx
// Bad — no label
<TextField placeholder="Enter your name" />

// Good — visible label
<TextField label="Full name" placeholder="e.g. Jane Smith" />
```

For icon-only buttons, use `aria-label`:

```tsx
<Button variant="ghost" aria-label="Close dialog">
  <CloseIcon aria-hidden />
</Button>
```

## Error messages

Always pass the error message via the `errorMessage` prop rather than rendering it separately. The composite wires it with `aria-describedby` and sets `aria-invalid="true"` on the input, so screen readers announce the error when the field is focused.

```tsx
<TextField
  label="Username"
  value={username}
  onChange={e => setUsername(e.target.value)}
  errorMessage={errors.username}   // announced automatically
/>
```

Never rely on color alone to communicate an error — the border turns red AND the error text appears AND `aria-invalid` is set.

## Keyboard navigation

All interactive components support full keyboard navigation:

| Component | Keys |
|---|---|
| `Button`, form inputs | `Tab` / `Shift+Tab` to move focus |
| `Tabs` | `Arrow Left` / `Arrow Right` to switch tabs, `Tab` to enter panel |
| `Modal` | Focus is trapped inside; `Escape` closes; focus returns to the trigger on close |
| `Tooltip` | Appears on focus and hover; does not trap focus |
| `Select` | Native browser keyboard support (arrow keys, type to jump) |
| `RadioGroup` | `Arrow Up` / `Arrow Down` to select options |

Do not suppress the default focus outline. The design system's focus ring (`--ds-focus-ring-*` tokens) is visible and meets 3:1 contrast ratio against all surfaces.

## Focus management

### Modal

`Modal` traps focus inside while open and restores it to the element that opened the dialog when closed. Do not set `autoFocus` manually inside modals — the first focusable element receives focus automatically.

```tsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open settings</Button>

<Modal open={open} onClose={() => setOpen(false)} title="Settings">
  <ModalBody>…</ModalBody>
  <ModalFooter>
    <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="primary">Save</Button>
  </ModalFooter>
</Modal>
```

### Toast

`ToastProvider` uses `aria-live="polite"` for info/success toasts and `aria-live="assertive"` for error/warning toasts. Do not use `assertive` for non-critical messages — it interrupts screen reader announcements mid-sentence.

```tsx
const toast = useToast();

// Polite announcement — does not interrupt
toast.show({ message: 'Profile saved.', variant: 'success' });

// Assertive — interrupts current reading
toast.show({ message: 'Session expired. Please log in.', variant: 'error' });
```

## Color contrast

Semantic text and background token pairs are designed to meet the 4.5:1 minimum ratio required for normal text (AA). Key pairs:

- `--ds-color-text-default` on `--ds-color-bg-page`: 16.2:1
- `--ds-color-text-muted` on `--ds-color-bg-surface`: 4.6:1
- `--ds-color-text-on-action` on `--ds-color-action-primary` (default blue): 4.8:1

If you override brand colors, verify the contrast ratio using a tool like [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/). The minimum for body text is 4.5:1; for large text (18px+ regular or 14px+ bold) it is 3:1.

## Semantic HTML and landmark regions

Use `Heading` with the correct `level` prop to maintain a logical document outline. Do not skip levels for visual reasons — use the `size` prop instead:

```tsx
// Visually large but semantically h2 in the document outline
<Heading level={2} size="4xl">Section title</Heading>
```

Wrap main content areas in landmark elements (`<main>`, `<nav>`, `<aside>`, etc.) so screen reader users can jump between regions. `Navbar` renders a `<nav>` and `Sidebar` renders an `<aside>` automatically.

## Motion and animation

The design system respects `prefers-reduced-motion`. `Spinner`, transitions, and other animated elements automatically reduce or disable motion when the user has configured their OS to minimize animations. Do not add `transition` or `animation` to your own styles without a matching `prefers-reduced-motion: reduce` media query.

## Testing accessibility in your app

Run the built-in audit locally:

```bash
npm test   # axe-core runs on every component test
```

For end-to-end accessibility testing, consider adding [axe-playwright](https://github.com/abhinaba-ghosh/axe-playwright) to your Playwright suite. For manual audits, use the browser extension for [axe DevTools](https://www.deque.com/axe/devtools/) or run a Lighthouse audit in Chrome DevTools (Accessibility section).

The most common issues in consumer apps are:
1. Missing or wrong labels on custom interactive elements
2. Insufficient color contrast on custom-themed colors
3. Focus not returning to the trigger after closing a dialog
4. Dynamic content changes (errors, live regions) not announced
