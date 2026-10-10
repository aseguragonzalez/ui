---
name: ds-form
description: Build a form using design system composite field components. Use when asked to create a form, input screen, settings panel, or any UI with labeled fields and a submit action.
compatibility: Requires @aseguragonzalez/ui. React 18+.
metadata:
  layer: ui
  pattern: form-composite
allowed-tools: Read Glob Write Edit
---

Build a form using the design system's **composite field components**. Composites bundle Label + Input + Hint/Error with full ARIA wiring — never use raw primitives (TextInput, Select, etc.) directly inside a form.

## Step 1 — Map each field to its composite

| Data type | Composite to use |
|---|---|
| Single-line text | `TextField` |
| Password | `PasswordField` |
| Email | `EmailField` |
| Phone number | `PhoneField` |
| Integer / decimal | `NumberField` |
| Date | `DateField` |
| File upload | `FileField` |
| Search | `SearchField` |
| Multi-line text | `TextAreaField` |
| Dropdown selection | `SelectField` |
| Boolean toggle | `ToggleField` |
| Single checkbox with label | `CheckboxField` |
| Mutually exclusive options | `RadioGroup` |
| Group of checkboxes | `CheckboxGroup` |

## Step 2 — Wire each field

Every composite accepts these shared props:

```ts
label: string        // always required — never use placeholder as a label substitute
hint?: string        // helper text shown when no error is present
error?: string       // validation error — replaces hint when set
required?: boolean   // marks field required visually + aria-required
disabled?: boolean
```

`RadioGroup` differs slightly — it uses `legend` instead of `label`, and requires `name` and `options`:

```ts
legend: string
name: string
options: RadioOption[]   // { value: string; label: ReactNode; disabled?: boolean }
value?: string           // controlled
onChange?: (value: string) => void
```

An option's `label` can be any `ReactNode` (an image, a swatch, an `Avatar`, an icon plus text). A non-text label must still give the radio an accessible name — an `Avatar` (`role="img"` with `aria-label`), an `<img>` with `alt`, or visually hidden text — and should contain only phrasing content, since it renders inside a `<label>`.

`CheckboxGroup` follows the same shape, with an array of selected values:

```ts
legend: string
name: string
options: CheckboxOption[]   // { value: string; label: React.ReactNode; disabled?: boolean }
value?: string[]            // controlled
defaultValue?: string[]     // uncontrolled
onChange?: (value: string[]) => void   // checked values, in options order
```

`SelectField` accepts `options` (structured) or `children` (`<option>` elements), plus an optional `placeholder` string for the empty state.

## Step 3 — Choose controlled vs. uncontrolled

For simple forms without real-time validation, use **uncontrolled** fields (no `value`/`onChange`). Read values from the `onSubmit` FormData:

```tsx
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const nombre = data.get('nombre') as string;
}
```

For real-time validation or dependent fields, use **controlled** fields with local state.

## Step 4 — Add a submit button

Use `Button` with `type="submit"`. For a cancel action, use `variant="ghost"` or `variant="secondary"`.

## Step 5 — Write the file

Read the asset templates to match the output style:
- `assets/form_basic.tsx` — two fields and a submit button
- `assets/form_complete.tsx` — all field types, validation state, controlled pattern

## Gotchas

- `FileField` and `FileInput` are uncontrolled: they take no `value`, since a browser only lets the user set a file input. Read the files in `onChange` (`event.target.files`), and reset the field by resetting its form or remounting it.
- Never import `TextInput`, `Select`, or other primitives for form fields — always use the `*Field` composites.
- `error` and `hint` are mutually exclusive per field: error takes precedence. Never pass both expecting both to show.
- `CheckboxField.label` accepts `React.ReactNode` — useful when the label contains a link (e.g. "Acepto los [términos]").
- For a group of related checkboxes (not a single boolean), use `CheckboxGroup` instead of wrapping several `CheckboxField` in a hand-made `<fieldset>`. Read its values with `FormData.getAll(name)`.
- Default labels and UI strings are in **Spanish** (`"Nombre completo"`, `"Selecciona una opción"`, etc.).
- `inputId` is optional on all composites — omit it to let the component auto-generate a stable ID via `useId`.
- `size` prop is `'sm' | 'md' | 'lg'` and applies to the input, not the wrapper.
