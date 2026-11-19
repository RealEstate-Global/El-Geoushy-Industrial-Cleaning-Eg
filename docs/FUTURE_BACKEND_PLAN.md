# Future backend plan — NOT IMPLEMENTED IN MVP

The NEW CETRiS MVP is frontend-only. The existing ASP.NET Core Clean Architecture project is preserved as future source and was not modified or connected in this work.

## Proposed integration path

Keep frontend repository contracts stable, then introduce HTTP implementations behind those contracts after an API design review. The existing ASP.NET Core solution may be evaluated for future product and inquiry endpoints. Do not infer that any endpoint described here exists.

Proposed contract concepts (not working endpoints):

- `GET /api/v1/product` — public product, visible variants, and current offer.
- `GET /api/v1/content/{locale}` — public page content and FAQs for `ar` or `en`.
- `GET /api/v1/site-settings` — approved public contact and Maps settings.
- `POST /api/v1/inquiries` — validated, rate-limited public inquiry submission.
- Protected admin operations for product, variants, offers, content, FAQ, settings, and media, after identity and authorization design.

Before production, admin authentication must use real server-side sessions, RBAC, CSRF protection, audit logs, and secret management. Media should move to object storage or a managed media service. Public inquiries must be validated server-side and rate-limited. Google reviews remain external Google actions unless a legitimate API integration is separately designed.

Database selection and migrations require a separate review. No schema migration is performed by the frontend MVP.
