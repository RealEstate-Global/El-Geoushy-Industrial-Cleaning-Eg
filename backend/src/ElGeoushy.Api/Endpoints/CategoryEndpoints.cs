using ElGeoushy.Application.Features.Categories;

namespace ElGeoushy.Api.Endpoints;

public static class CategoryEndpoints
{
    public static IEndpointRouteBuilder MapCategoryEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/categories", async (
            GetCategoriesQueryHandler handler,
            CancellationToken cancellationToken) =>
        {
            var categories = await handler.HandleAsync(cancellationToken);
            return Results.Ok(categories);
        })
        .WithTags("Categories")
        .WithName("GetCategories");

        return app;
    }
}
