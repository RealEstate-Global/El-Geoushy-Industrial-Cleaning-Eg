using ElGeoushy.Api.Contracts;

namespace ElGeoushy.Api.Endpoints;

/// <summary>
/// Local sink for frontend runtime errors. Point `VITE_ERROR_REPORT_ENDPOINT` at
/// `http://localhost:5080/api/client-errors` to collect browser errors here.
/// </summary>
public static class ClientErrorEndpoints
{
    public static IEndpointRouteBuilder MapClientErrorEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/client-errors", (
            ClientErrorRequest request,
            ILogger<ClientErrorSink> logger) =>
        {
            if (string.IsNullOrWhiteSpace(request.Message) || request.Message.Length > 4000 ||
                request.Stack?.Length > 12000 || request.Route?.Length > 2048 || request.Mechanism?.Length > 128)
            {
                return Results.ValidationProblem(new Dictionary<string, string[]>
                {
                    ["request"] = ["Client error fields exceed the allowed limits."],
                });
            }

            logger.LogWarning(
                "Client error on {Route} ({Mechanism}): {Message}{NewLine}{Stack}",
                request.Route ?? "unknown",
                request.Mechanism ?? "manual",
                request.Message ?? "no message",
                Environment.NewLine,
                request.Stack ?? "no stack trace");

            return Results.Accepted();
        })
        .WithTags("Diagnostics")
        .WithName("ReportClientError")
        .RequireRateLimiting("client-errors");

        return app;
    }

    internal sealed class ClientErrorSink;
}
