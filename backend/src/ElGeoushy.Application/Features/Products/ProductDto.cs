using ElGeoushy.Domain.Entities;

namespace ElGeoushy.Application.Features.Products;

/// <summary>Read model returned to clients. Kept separate from the EF entity.</summary>
public sealed record ProductDto(
    int Id,
    string Slug,
    string NameAr,
    string? NameEn,
    string ShortDescription,
    string? Description,
    string? ImageUrl,
    IReadOnlyList<string> Gallery,
    IReadOnlyList<string> AvailableSizes,
    IReadOnlyList<string> UsageInstructions,
    IReadOnlyList<ProductSpecificationDto> Specifications,
    bool IsFeatured,
    bool IsDemo,
    string CategorySlug,
    string CategoryName);

public sealed record ProductSpecificationDto(string Label, string Value);

internal static class ProductMappings
{
    public static ProductDto ToDto(this Product product) => new(
        product.Id,
        product.Slug,
        product.NameAr,
        product.NameEn,
        product.ShortDescription,
        product.Description,
        product.ImageUrl,
        product.Gallery,
        product.AvailableSizes,
        product.UsageInstructions,
        product.Specifications.Select(s => new ProductSpecificationDto(s.Label, s.Value)).ToList(),
        product.IsFeatured,
        product.IsDemo,
        product.Category?.Slug ?? string.Empty,
        product.Category?.NameAr ?? string.Empty);
}
