# Error reporting

Error handling is local. Nothing is sent to a hosted platform, and no third-party
telemetry SDK is loaded.

## Frontend

`el-geoushy/src/shared/lib/error-reporting.ts` exports:

- `reportError(error, context?)` — logs the error and optionally posts it.
- `reportRuntimeError(error, mechanism)` — same, with a mechanism label.

The root error boundary in `src/routes/__root.tsx` calls `reportError` with
`mechanism: "react_error_boundary"`.

Behavior:

1. In development, the full structured payload and the original error are written
   with `console.error`.
2. In production, the message is written with `console.error` so it reaches the
   server/container log.
3. If `VITE_ERROR_REPORT_ENDPOINT` is set at build time, the payload is also
   POSTed as JSON with `keepalive`. A failed POST is swallowed so reporting can
   never break the app.

Payload:

```json
{
  "message": "Something failed",
  "route": "/products",
  "mechanism": "react_error_boundary",
  "handled": false,
  "timestamp": "2026-01-01T00:00:00.000Z",
  "stack": "Error: Something failed\n    at ..."
}
```

### Enabling the backend sink

Run the API, then build the frontend with the endpoint:

```sh
# el-geoushy/.env.local
VITE_ERROR_REPORT_ENDPOINT=http://localhost:5080/api/client-errors
```

The backend logs each report at warning level through
`MapClientErrorEndpoints`. In production, ship those logs to your own logging
stack (file, container stdout, or a log aggregator you control).

### Server-side errors

`src/shared/lib/error-capture.ts` records the original error when a server-side
throw is swallowed by h3. `src/server.ts` converts the generic 500 JSON response
into a readable HTML error page and logs the captured error. `src/start.ts` does
the same for middleware-level failures.

## Backend

- `DomainException` → `400` ProblemDetails via `DomainExceptionHandler`.
- Everything else → `500` ProblemDetails via `UseExceptionHandler` +
  `AddProblemDetails`.
- Client reports → `POST /api/client-errors` → application log.

## What not to do

- Do not add `LOVABLE_API_KEY`-style platform keys or hosted telemetry hooks.
- Do not put secrets in `VITE_*` variables; they are embedded in the bundle.
- Do not include personal data in error contexts.
