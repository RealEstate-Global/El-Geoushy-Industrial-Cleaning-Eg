# ElGeoushy backend

ASP.NET Core 9 API organized with Clean Architecture. Locally uses SQLite.

```sh
dotnet restore
dotnet build
dotnet test
dotnet run --project src/ElGeoushy.Api   # http://localhost:5080
```

- Health: <http://localhost:5080/health>
- OpenAPI (development): <http://localhost:5080/openapi/v1.json>
- Local database: `elgeoushy.db` (created and seeded on first run)
- Product creation (`POST /api/products`) is available only in Development. Until
  admin authentication is implemented, production catalog changes must be made
  through a controlled, authorized deployment or database maintenance process.

Layers: `Api -> Infrastructure -> Application -> Domain`. Add features under
`src/ElGeoushy.Application/Features/` and map them in `src/ElGeoushy.Api/Endpoints/`.

Full documentation: [../docs/BACKEND.md](../docs/BACKEND.md) and
[../docs/API.md](../docs/API.md).
