---
name: ds-layout
description: Build a page shell with navigation. Use when asked for a sidebar layout, app navigation, top navbar, or a page with a main content area.
compatibility: Requires @aseguragonzalez/ui. React 18+.
metadata:
  layer: ui
  pattern: layout
allowed-tools: Read Glob Write Edit
---

Build a page shell using `Sidebar`, `Navbar`, and `Breadcrumb`. Choose the right layout type for the product context.

## Step 1 — Choose a layout type

| Context | Layout |
|---|---|
| App with persistent navigation (dashboard, admin, SaaS) | `Sidebar` |
| Marketing site, docs, content site | `Navbar` |
| Sub-page navigation within either layout | `Breadcrumb` |

Both `Sidebar` and `Navbar` can coexist (Navbar at the top, Sidebar on the side) if needed.

## Step 2 — Build the navigation items

Both components use the same `NavItem` / `SidebarItem` shape:

```ts
interface SidebarItem {
  key: string          // unique identifier
  label: string
  icon?: React.ReactNode
  href?: string
  isActive?: boolean
  onClick?: () => void
}

interface NavItem {
  key: string
  label: string
  href?: string
  isActive?: boolean
  onClick?: () => void
}
```

Mark the current page with `isActive: true` on the matching item.

## Step 3 — Wire Sidebar slots

`Sidebar` accepts three optional content slots:

| Prop | Description |
|---|---|
| `logo` | Always visible, even when collapsed. Use for a brand icon or logomark. |
| `header` | Fades out when collapsed. Use for brand name or workspace title next to the logo. |
| `footer` | Pinned to the bottom of the sidebar panel, above the collapse button. Use for user profile, settings link, or legal text. |

## Step 4 — Wire Navbar slots

```ts
brand?: React.ReactNode    // logo or title on the left
items?: NavItem[]          // center navigation links
actions?: React.ReactNode  // right side — Avatar, Button, etc.
sticky?: boolean           // position: sticky at the top
```

## Step 5 — Add Breadcrumb (optional)

Place `Breadcrumb` inside the main content area, above the page heading. Each item has `label` and an optional `href`. The last item has no `href` — it is rendered as the current page.

```ts
items: BreadcrumbItem[]   // { label: string; href?: string }
```

## Step 6 — Write the files

Read asset templates:
- `assets/layout_sidebar.tsx` — full app shell with Sidebar + main content
- `assets/layout_navbar.tsx` — Navbar layout with brand, links, and actions

## Gotchas

- **`Sidebar` is responsive by default.** On desktop it collapses to an icon-only rail; on mobile it opens as a drawer via portal. No additional code is needed for this behavior.
- **`logo` vs `header` slots:** pass the icon/logomark as `logo` and the text name as `header` so the icon stays visible in collapsed state.
- **`footer` slot** is useful for `Avatar` + username. Place it in `footer`, not at the bottom of `items`.
- **`Navbar` `actions` slot** accepts any React node — typically an `Avatar` or a `Button`. It renders on the right side of the bar.
- **Unique landmark labels:** If both Sidebar and Navbar are on the same page, set different `aria-label` values on each so screen readers can distinguish the two navigation landmarks.
- **`isActive`** should reflect the current route — derive it from your router (`useLocation`, `usePathname`, etc.) rather than hardcoding it.
- **`sticky` on Navbar** adds `position: sticky; top: 0` via the token-based style. Use it for content layouts where the page scrolls under the bar.
