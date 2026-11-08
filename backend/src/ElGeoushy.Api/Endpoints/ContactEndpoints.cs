using ElGeoushy.Api.Contracts;
using ElGeoushy.Application.Features.Contact;

namespace ElGeoushy.Api.Endpoints;

public static class ContactEndpoints
{
    public static IEndpointRouteBuilder MapContactEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/contact", async (
            SubmitContactMessageRequest request,
            SubmitContactMessageCommandHandler handler,
            CancellationToken cancellationToken) =>
        {
            var errors = new Dictionary<string, string[]>();
            if (string.IsNullOrWhiteSpace(request.Name) || request.Name.Length > 200)
                errors[nameof(request.Name)] = ["Name is required and must be at most 200 characters."];
            if (string.IsNullOrWhiteSpace(request.Phone) || request.Phone.Length > 40)
                errors[nameof(request.Phone)] = ["Phone is required and must be at most 40 characters."];
            if (request.Email?.Length > 320)
                errors[nameof(request.Email)] = ["Email must be at most 320 characters."];
            if (string.IsNullOrWhiteSpace(request.Subject) || request.Subject.Length > 120)
                errors[nameof(request.Subject)] = ["Subject is required and must be at most 120 characters."];
            if (string.IsNullOrWhiteSpace(request.Message) || request.Message.Length > 2000)
                errors[nameof(request.Message)] = ["Message is required and must be at most 2000 characters."];
            if (errors.Count > 0)
                return Results.ValidationProblem(errors);

            var id = await handler.HandleAsync(
                new SubmitContactMessageCommand(request.Name, request.Phone, request.Email, request.Subject, request.Message),
                cancellationToken);

            return Results.Created($"/api/contact/{id}", new { id });
        })
        .WithTags("Contact")
        .WithName("SubmitContactMessage")
        .RequireRateLimiting("contact");

        return app;
    }
}
