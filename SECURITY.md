# Security policy

## Reporting a vulnerability

Do not open a public issue for a security problem. Report it privately to the
maintainers with:

- a description of the issue and its impact,
- steps or a proof of concept to reproduce it,
- the affected area (`el-geoushy/` or `backend/`),
- any suggested remediation.

You should receive an acknowledgement within a few business days.

## Handling secrets

- Secrets are never committed. Use environment variables, .NET user secrets, or
  the deployment platform's secret store.
- Frontend variables prefixed with `VITE_` are embedded in the browser bundle.
  Treat them as public.
- Rotate any credential that may have been exposed, then review the history of
  the affected branch with the maintainers.
