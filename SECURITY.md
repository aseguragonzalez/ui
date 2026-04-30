# Security policy

## Supported versions

| Version | Supported |
|---|---|
| Latest minor on `main` | Yes |
| Previous minor | Security fixes only |
| Older versions | No |

## Reporting a vulnerability

**Do not open a public GitHub issue for security vulnerabilities.**

Report vulnerabilities privately through [GitHub Security Advisories](https://github.com/your-org/design-system/security/advisories/new). This keeps the details confidential until a fix is released.

### What to include

- A description of the vulnerability and its potential impact
- The affected versions
- Steps to reproduce or a proof-of-concept
- Any known mitigations or workarounds

### Response timeline

| Milestone | Target |
|---|---|
| Acknowledgement | 2 business days |
| Severity assessment | 5 business days |
| Fix or mitigation plan | 15 business days for high/critical |
| Public disclosure | Coordinated with the reporter after a fix is released |

We follow responsible disclosure. We will credit reporters in the release notes unless you prefer to remain anonymous.

## Scope

This package is a React component library with zero runtime dependencies. The most relevant security considerations are:

- **XSS via unsanitised props** — components render user-supplied content (labels, hints, error messages). Sanitise any untrusted input before passing it as props.
- **Dependency vulnerabilities** — run `npm audit` regularly. Dependabot is configured to open PRs for vulnerable dependencies automatically.
- **Bundled code integrity** — published releases include [npm provenance](https://docs.npmjs.com/generating-provenance-statements) so you can verify that the package was built from this repository.

## Out of scope

- Vulnerabilities in peer dependencies (`react`, `react-dom`) — report these to the React project directly.
- Issues that require physical access to the end user's device.
- Social engineering attacks.
