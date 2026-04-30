# Design System Skills

Skills are instruction files for AI agents (Claude Code) that guide the generation of UI code using this design system. Each skill encodes the correct component choices, accessibility patterns, and gotchas for a specific type of UI — so the agent produces idiomatic, production-ready output without needing to infer conventions from scratch.

## What is a skill?

A skill is a directory containing a `SKILL.md` file and an `assets/` folder with code templates. The `SKILL.md` defines when to use the skill, step-by-step instructions for the agent, and a list of gotchas derived from the system's actual conventions. The assets are concrete code examples the agent references while generating output.

## Why use skills instead of just asking the agent?

Without a skill, an agent has to guess:
- Whether to use a primitive (`TextInput`) or a composite (`TextField`)
- How ARIA wiring works across field composites
- Which chart data shape matches which chart type
- Where `ToastProvider` must be placed

Skills encode all of that knowledge explicitly. The result is consistent code that follows the system's layer hierarchy, uses semantic tokens correctly, and passes the project's axe accessibility tests.

## Available skills

| Skill | Use when you need… |
|---|---|
| [`ds-form`](ds-form/SKILL.md) | A form with one or more input fields and a submit button |
| [`ds-layout`](ds-layout/SKILL.md) | A page shell with sidebar navigation or a top navbar |
| [`ds-data-table`](ds-data-table/SKILL.md) | A sortable data table with typed columns |
| [`ds-charts`](ds-charts/SKILL.md) | A bar, line, donut, radar, or scatter chart |
| [`ds-feedback`](ds-feedback/SKILL.md) | Toast notifications, inline alerts, or a confirmation modal |

## How to install

Copy the skill directories to your user skills folder so Claude Code can discover them:

```bash
cp -r docs/skills/ds-form     ~/.claude/skills/
cp -r docs/skills/ds-layout   ~/.claude/skills/
cp -r docs/skills/ds-data-table ~/.claude/skills/
cp -r docs/skills/ds-charts   ~/.claude/skills/
cp -r docs/skills/ds-feedback ~/.claude/skills/
```

Once installed, invoke a skill explicitly in Claude Code:

```
/ds-form
/ds-layout
/ds-data-table
/ds-charts
/ds-feedback
```

Or describe what you want and Claude Code will suggest the relevant skill.

## Package import

All components are exported from the package root:

```ts
import { TextField, SelectField, RadioGroup } from '@aseguragonzalez/ui';
import '@aseguragonzalez/ui/index.css';
```

The CSS import is required — it loads the design tokens and component styles.
