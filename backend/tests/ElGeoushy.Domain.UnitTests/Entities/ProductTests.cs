using ElGeoushy.Domain.Entities;
using ElGeoushy.Domain.Exceptions;

namespace ElGeoushy.Domain.UnitTests;

public sealed class ProductTests
{
    private static Product CreateValidProduct() => new()
    {
        Slug = "test-product",
        NameAr = "منتج اختبار",
        ShortDescription = "A product used by unit tests.",
        CategoryId = 1,
    };

    [Fact]
    public void New_product_is_active_by_default()
    {
        var product = CreateValidProduct();

        Assert.True(product.IsActive);
        Assert.False(product.IsFeatured);
    }

    [Fact]
    public void Deactivate_and_activate_flip_the_active_flag()
    {
        var product = CreateValidProduct();

        product.Deactivate();
        Assert.False(product.IsActive);

        product.Activate();
        Assert.True(product.IsActive);
    }

    [Fact]
    public void Feature_toggles_the_featured_flag()
    {
        var product = CreateValidProduct();

        product.Feature(true);

        Assert.True(product.IsFeatured);
    }

    [Theory]
    [InlineData("", "منتج")]
    [InlineData("slug", "")]
    public void EnsureValid_rejects_missing_required_fields(string slug, string name)
    {
        var product = CreateValidProduct();
        product.Slug = slug;
        product.NameAr = name;

        Assert.Throws<DomainException>(product.EnsureValid);
    }

    [Fact]
    public void EnsureValid_rejects_products_without_a_category()
    {
        var product = CreateValidProduct();
        product.CategoryId = 0;

        Assert.Throws<DomainException>(product.EnsureValid);
    }
}
