# Contributing

Thank you for taking the time to contribute. This document covers the GitHub workflow. For the technical side — architecture, scripts, how to add a component — see [docs/contributing.md](docs/contributing.md).

## Before you start

- Check the [open issues](https://github.com/aseguragonzalez/ui/issues) and [pull requests](https://github.com/aseguragonzalez/ui/pulls) to avoid duplicating work.
- For significant changes (new components, breaking API changes), open an issue first to discuss the approach before writing code.
- All contributions must target WCAG 2.1 AA and include axe-core tests. See [docs/accessibility.md](docs/accessibility.md).

## Workflow

1. Fork the repository and create a branch from `main`:

   ```bash
   git checkout -b type/short-description
   # e.g. feat/datepicker-range, fix/tooltip-focus-trap, docs/theming-examples
   ```

2. Make your changes following the conventions in [docs/contributing.md](docs/contributing.md).

3. Run the full validation suite before pushing:

   ```bash
   npm run lint
   npm test
   npm run build
   ```

4. Push and open a pull request against `main`.

## Branch naming

| Prefix | Use for |
|---|---|
| `feat/` | New component or feature |
| `fix/` | Bug fix |
| `docs/` | Documentation only |
| `refactor/` | Internal refactor with no behaviour change |
| `chore/` | Dependency updates, config, tooling |

## Commit messages

Use the [Conventional Commits](https://www.conventionalcommits.org) format:

```
<type>(<scope>): <short summary>

# Examples
feat(TextField): add maxLength prop with character count
fix(Modal): restore focus to trigger on close
docs(theming): add dark mode override example
chore(deps): update vitest to 4.2.0
```

Breaking changes must include `BREAKING CHANGE:` in the commit body or a `!` after the type:

```
feat(Button)!: remove 'outline' variant in favour of 'ghost'

BREAKING CHANGE: The 'outline' variant has been removed.
Replace <Button variant="outline"> with <Button variant="ghost">.
```

## Pull request checklist

- [ ] `npm run lint` passes with no errors
- [ ] `npm test` passes with no failures or axe violations
- [ ] `npm run build` completes successfully
- [ ] New or changed components have stories covering key states
- [ ] Public API changes are reflected in the relevant `docs/` file
- [ ] Breaking changes are documented in the PR description

## Versioning

This project follows [Semantic Versioning](https://semver.org):

- **Patch** (`0.x.Y`) — bug fixes with no API change
- **Minor** (`0.X.0`) — new components or props, backwards-compatible
- **Major** (`X.0.0`) — breaking changes

Releases are created by maintainers. Do not bump the version in `package.json` in your PR.

## Code of conduct

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md). By contributing, you agree to uphold it.
