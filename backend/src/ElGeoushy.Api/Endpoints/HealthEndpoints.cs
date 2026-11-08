namespace ElGeoushy.Api.Endpoints;

public static class HealthEndpoints
{
    public static IEndpointRouteBuilder MapHealthEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/health", () => Results.Ok(new
        {
            status = "ok",
            service = "ElGeoushy.Api",
            timestamp = DateTimeOffset.UtcNow,
        }))
        .WithTags("Health")
        .WithName("HealthCheck");

        return app;
    }
}
