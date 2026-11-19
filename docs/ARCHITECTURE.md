# Repository architecture

```text
el-geoushy/    Next.js App Router frontend (NEW CETRiS)
backend/       Preserved ASP.NET Core solution, not connected to the MVP
docs/          Setup, content, frontend, deployment, and future integration notes
.github/       CI and templates
```

The frontend owns a typed demo data seed and a local browser repository adapter. App Router pages compose feature components; the client provider hydrates local overrides after mount. Bilingual dictionaries live in split Arabic and English files. See [frontend architecture](FRONTEND_ARCHITECTURE.md).

The current backend remains a separate future project. The frontend does not call it. Any future API integration requires its own design/security review; see [future backend plan](FUTURE_BACKEND_PLAN.md).
