# UX guidelines

## Forms

### Choose the right input

| Scenario | Component |
|---|---|
| Single-line free text | `TextField` |
| Multi-line text | `TextAreaField` |
| Email address | `EmailField` |
| Password | `PasswordField` |
| Phone number | `PhoneField` |
| Numeric value | `NumberField` |
| Date | `DateField` |
| Search query | `SearchField` |
| One choice from a short list (≤5 options, always visible) | `RadioGroup` |
| One choice from a long list or with limited space | `SelectField` |
| Binary opt-in (newsletter, notifications) | `ToggleField` |
| Binary agreement (terms, filter) | `CheckboxField` |
| Multiple choices from a list | Multiple `CheckboxField` components |

### Labels and hints

Every field needs a visible label. Use the `hint` prop for instructional text that helps users fill in the field correctly — not for validation errors:

```tsx
<PasswordField
  label="Password"
  hint="At least 8 characters, one uppercase, one number."
  errorMessage={errors.password}
/>
```

Keep hints brief (one sentence). If more explanation is needed, link to a help article instead of embedding a paragraph in the form.

### Validation and errors

**Validate on blur, not on every keystroke.** Showing an error while the user is still typing is disruptive. Validate when the field loses focus, then clear the error as the user corrects it:

```tsx
const [value, setValue] = useState('');
const [error, setError] = useState('');

function validate(v: string) {
  if (!v.includes('@')) setError('Enter a valid email address.');
  else setError('');
}

<EmailField
  label="Email"
  value={value}
  onChange={e => { setValue(e.target.value); if (error) validate(e.target.value); }}
  onBlur={e => validate(e.target.value)}
  errorMessage={error}
/>
```

**Error messages must say what to do**, not just what went wrong:

```
Bad:  "Invalid email"
Good: "Enter a valid email address (e.g. name@example.com)"

Bad:  "Required"
Good: "Enter your first name"
```

### Required fields

Mark all required fields with the `required` prop. If most fields are required, consider marking the few optional ones with "(optional)" in the label instead:

```tsx
<TextField label="Company name (optional)" />
```

### Disabled vs read-only

Use `disabled` when the field cannot be interacted with in this context (e.g. a plan feature not available on the current tier). Use the `readOnly` HTML attribute when the value is intentional and should be copyable but not editable.

Disabled fields are excluded from form submission and keyboard navigation — do not use them to display data that users need.

---

## Feedback patterns

### Toast vs Alert

| Use `Toast` when… | Use `Alert` when… |
|---|---|
| The action succeeded or failed | There is a persistent problem the user must address |
| The message is transient (auto-dismisses) | The message must stay visible until resolved |
| The message is triggered by a user action | The message is triggered by the system or page state |
| The message does not block the user | The message is directly related to page content |

```tsx
// Toast — "Your settings have been saved"
const toast = useToast();
toast.show({ message: 'Settings saved.', variant: 'success' });

// Alert — "Your subscription expires in 3 days"
<Alert variant="warning">
  Your subscription expires on April 30. <a href="/billing">Renew now</a>
</Alert>
```

### Loading states

Show a `Spinner` inside the triggering button when an action is in progress. This keeps the user's focus on the action and prevents double-submissions:

```tsx
<Button variant="primary" loading={isSubmitting} disabled={isSubmitting}>
  {isSubmitting ? 'Saving…' : 'Save changes'}
</Button>
```

Use `ProgressBar` for operations with a known duration or step count (file uploads, multi-step wizards). Use `Spinner` for operations of unknown duration.

Do not show both a spinner in the button and a full-page overlay unless the entire UI is blocked.

---

## Modals

Modals interrupt the user's flow. Use them only when:

- A decision is required before the user can continue
- A secondary task would cause the user to lose context if it happened on a new page
- The action is destructive and needs explicit confirmation

Do not use modals for:
- Displaying information the user did not ask for (use `Alert` instead)
- Long forms that can be placed on their own page
- Error messages that result from user actions (use inline `errorMessage` props)

### Modal anatomy

```tsx
<Modal open={open} onClose={handleClose} title="Delete workspace">
  <ModalBody>
    <Text>This will permanently delete the workspace and all its data. This action cannot be undone.</Text>
  </ModalBody>
  <ModalFooter>
    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
    <Button variant="danger" onClick={handleDelete}>Delete workspace</Button>
  </ModalFooter>
</Modal>
```

Always include a cancel path. Always put the primary action on the right. For destructive confirmations, make the confirm button clearly destructive (use `variant="danger"` if your theme includes it, or use wording like "Delete workspace" instead of just "Confirm").

---

## Tooltips

Use `Tooltip` for supplementary information that is not critical to completing the task. Tooltips should never be the only way to access important information — they are invisible on touch devices and hidden until hover/focus.

```tsx
// Good — supplementary context
<Tooltip content="Appears in search results and browser tabs" placement="top">
  <Label>Page title</Label>
</Tooltip>

// Bad — required for the user to understand what to do
<Tooltip content="Enter your 6-digit verification code">
  <TextInput aria-label="Verification code" />
</Tooltip>
// Better: use the hint prop on the composite
<TextField label="Verification code" hint="Enter the 6-digit code from your authenticator app." />
```

Keep tooltip content short — one sentence maximum. Do not put interactive elements (links, buttons) inside a tooltip.

---

## Navigation and wayfinding

Use `Breadcrumb` on pages that are more than two levels deep in a hierarchy. Keep breadcrumb labels short and consistent with page titles.

Use `Badge` to surface counts or status inline (unread messages, item status). Do not use badges as the only way to convey meaning — pair them with text or an icon with an `aria-label`.

Use `Tabs` for content that belongs to the same context and where the user benefits from switching between views without leaving the page. Do not use tabs for sequential steps — use a wizard or stepper pattern instead.

---

## Data display

### DataTable

Show a summary or empty state component when there are no rows — never an empty table with just headers. Provide clear column headers; avoid abbreviations unless the full term is in a tooltip.

For large datasets, enable pagination rather than loading all rows at once. Communicate the total count and current page position.

### Charts

Every chart needs a title and axis labels. Do not rely on color alone to distinguish series — use labels, patterns, or direct annotation. The default chart palette (`--ds-chart-1` through `--ds-chart-6`) is designed to be distinguishable, but test with a color-blindness simulator for critical use cases.

Prefer `BarChart` for comparisons, `LineChart` for trends over time, `DonutChart` for part-to-whole relationships (with fewer than 6 segments), `RadarChart` for multivariate comparisons across a small set of entities.
