# Backend (`backend/`)

ASP.NET Core 9 solution organized with Clean Architecture. Locally it uses
SQLite; the persistence layer is isolated so a different provider can replace it
without touching Domain or Application.

## Projects

| Project | Responsibility | References |
| --- | --- | --- |
| `ElGeoushy.Domain` | Entities, invariants, `DomainException` | none |
| `ElGeoushy.Application` | Use cases, DTOs, `IApplicationDbContext` | Domain |
| `ElGeoushy.Infrastructure` | EF Core context, configurations, seeding, DI | Application |
| `ElGeoushy.Api` | Minimal API endpoints, contracts, middleware | Infrastructure |
| `ElGeoushy.Domain.UnitTests` | Domain invariant tests | Domain |
| `ElGeoushy.Application.UnitTests` | Handler tests with EF InMemory | Application, Infrastructure |

## Commands

Run from `backend/`:

```sh
dotnet restore
dotnet build
dotnet test
dotnet run --project src/ElGeoushy.Api
```

The API listens on <http://localhost:5080> by default
(`Properties/launchSettings.json`).

Product creation (`POST /api/products`) is enabled only in Development. Until an
authenticated admin workflow exists, make production catalog changes through a
controlled, authorized deployment or database maintenance process.

## Local database

`ApplicationDbContext` uses the `DefaultConnection` string
(`Data Source=elgeoushy.db` by default). On startup, `DbInitializer` calls
`MigrateAsync`. A migration creates the schema; the demo catalog is seeded only
in Development when no categories exist. The local database file is created next
to the API working directory and is gitignored.

For schema changes:

1. Add a migration from `backend/`:
   `dotnet ef migrations add <Name> --project src/ElGeoushy.Infrastructure --startup-project src/ElGeoushy.Api`
2. Review the migration, back up production data, then deploy the migration with
   the API release. Existing databases created by `EnsureCreated` need a
   one-time schema adoption plan before deploying this initial migration; do not
   run it against a non-empty legacy database as if it were empty.

The public write endpoints use in-memory per-IP rate limits: contact accepts 5
requests per 10 minutes and client error reports accept 30 per minute. Requests
are capped at 64 KB, with stricter field limits on both endpoints. Multi-instance
production deployments should also enforce matching limits at the reverse proxy.
Product creation is Development-only until admin authentication exists.

## Adding a feature

1. **Domain** — add or extend an entity under `src/ElGeoushy.Domain/Entities`.
   Put invariants in methods (see `Product.EnsureValid`).
2. **Application** — create `src/ElGeoushy.Application/Features/<Area>/` with a
   request record and a handler. Depend on `IApplicationDbContext`, never on
   `ApplicationDbContext`.
3. **Register** — add the handler to
   `Application/DependencyInjection.cs`.
4. **Api** — add a contract record in `Contracts/` if the body is complex, then
   map the endpoint in `Endpoints/` and call the handler from `Program.cs`.
5. **Tests** — add unit tests next to the existing suites.

## Error handling

- Domain rule violations throw `DomainException`.
- `DomainExceptionHandler` maps them to RFC 7807 `400 Bad Request`.
- Unhandled exceptions flow through `UseExceptionHandler` + `AddProblemDetails`.
- Client-side runtime errors can be posted to `/api/client-errors`; they are
  written to the application log.

## Configuration

`appsettings.json` keys:

- `ConnectionStrings:DefaultConnection`
- `Cors:AllowedOrigins` (array)

Override them with environment variables, for example
`ConnectionStrings__DefaultConnection` and `Cors__AllowedOrigins__0`.
