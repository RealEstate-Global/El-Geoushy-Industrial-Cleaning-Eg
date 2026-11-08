using ElGeoushy.Api.Contracts;
using ElGeoushy.Application.Features.Products;

namespace ElGeoushy.Api.Endpoints;

public static class ProductEndpoints
{
    public static IEndpointRouteBuilder MapProductEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/products").WithTags("Products");

        group.MapGet("", async (
            string? category,
            string? search,
            string? sort,
            int? page,
            int? pageSize,
            GetProductsQueryHandler handler,
            CancellationToken cancellationToken) =>
        {
            var result = await handler.HandleAsync(
                new GetProductsQuery(category, search, sort, page ?? 1, pageSize ?? 20),
                cancellationToken);

            return Results.Ok(result);
        })
        .WithName("GetProducts")
        .WithSummary("Returns the active catalog, optionally filtered by category, search text, and sort order.");

        group.MapGet("/{slug}", async (
            string slug,
            GetProductBySlugQueryHandler handler,
            CancellationToken cancellationToken) =>
        {
            var product = await handler.HandleAsync(new GetProductBySlugQuery(slug), cancellationToken);
            return product is null ? Results.NotFound() : Results.Ok(product);
        })
        .WithName("GetProductBySlug")
        .WithSummary("Returns one active product by its slug.");

        group.MapPost("", async (
            CreateProductRequest request,
            CreateProductCommandHandler handler,
            CancellationToken cancellationToken) =>
        {
            var created = await handler.HandleAsync(
                new CreateProductCommand(
                    request.Slug,
                    request.NameAr,
                    request.NameEn,
                    request.ShortDescription,
                    request.Description,
                    request.ImageUrl,
                    request.CategoryId,
                    request.IsFeatured,
                    request.IsDemo),
                cancellationToken);

            return Results.Created($"/api/products/{created.Slug}", created);
        })
        .WithName("CreateProduct")
        .WithSummary("Creates a product. Wire authentication before exposing this publicly.");

        return app;
    }
}
