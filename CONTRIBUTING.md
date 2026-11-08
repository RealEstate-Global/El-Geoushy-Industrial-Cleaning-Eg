# Contributing

## Before you open a pull request

Frontend:

```sh
cd el-geoushy
pnpm install --frozen-lockfile
pnpm run typecheck
pnpm run lint
pnpm run test
pnpm run build
```

Backend:

```sh
cd backend
dotnet restore
dotnet build --no-restore
dotnet test --no-build
```

## Conventions

- Keep frontend changes inside `el-geoushy/` and backend changes inside
  `backend/`. Cross-cutting docs go in `docs/`.
- Follow the existing structure. Read [AGENTS.md](AGENTS.md) and
  [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) first.
- Never commit secrets, database files, or build output.
- Update `docs/` and the relevant README when behavior changes.
- Use clear, focused commits. Do not force-push shared branches.
