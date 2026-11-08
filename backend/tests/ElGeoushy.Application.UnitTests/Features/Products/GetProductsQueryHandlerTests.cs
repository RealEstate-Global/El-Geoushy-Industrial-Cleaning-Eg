using ElGeoushy.Application.Features.Products;
using ElGeoushy.Domain.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace ElGeoushy.Application.UnitTests.Features.Products;

public sealed class GetProductsQueryHandlerTests
{
    [Fact]
    public async Task Returns_only_active_products_in_the_requested_category()
    {
        var (db, household, _) = await TestDb.SeedAsync();
        var handler = new GetProductsQueryHandler(db);

        var result = await handler.HandleAsync(new GetProductsQuery(Category: household.Slug));

        Assert.Equal(1, result.TotalCount);
        Assert.All(result.Items, item => Assert.Equal(household.Slug, item.CategorySlug));
    }

    [Fact]
    public async Task Search_matches_name_or_short_description()
    {
        var (db, _, _) = await TestDb.SeedAsync();
        var handler = new GetProductsQueryHandler(db);

        var byName = await handler.HandleAsync(new GetProductsQuery(Search: "أرضيات"));
        var byDescription = await handler.HandleAsync(new GetProductsQuery(Search: "workshops"));

        Assert.Single(byName.Items);
        Assert.Single(byDescription.Items);
    }

    [Fact]
    public async Task Featured_products_come_first_by_default()
    {
        var (db, _, _) = await TestDb.SeedAsync();
        var handler = new GetProductsQueryHandler(db);

        var result = await handler.HandleAsync(new GetProductsQuery());

        Assert.True(result.Items[0].IsFeatured);
    }

    [Fact]
    public async Task Create_rejects_duplicate_slugs()
    {
        var (db, household, _) = await TestDb.SeedAsync();
        var handler = new CreateProductCommandHandler(db);

        await Assert.ThrowsAsync<DomainException>(() => handler.HandleAsync(
            new CreateProductCommand(
                "floor-cleaner",
                "اسم مكرر",
                null,
                "Duplicate slug.",
                null,
                null,
                household.Id)));
    }
}
