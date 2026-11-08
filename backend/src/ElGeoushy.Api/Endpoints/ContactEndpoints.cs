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
            var id = await handler.HandleAsync(
                new SubmitContactMessageCommand(request.Name, request.Phone, request.Email, request.Message),
                cancellationToken);

            return Results.Created($"/api/contact/{id}", new { id });
        })
        .WithTags("Contact")
        .WithName("SubmitContactMessage");

        return app;
    }
}
