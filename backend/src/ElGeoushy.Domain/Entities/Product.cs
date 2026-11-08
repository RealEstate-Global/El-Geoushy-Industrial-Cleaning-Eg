using ElGeoushy.Domain.Common;
using ElGeoushy.Domain.Exceptions;

namespace ElGeoushy.Domain.Entities;

/// <summary>A cleaning product in the catalog.</summary>
public sealed class Product : BaseAuditableEntity
{
    public string Slug { get; set; } = string.Empty;

    public string NameAr { get; set; } = string.Empty;

    public string? NameEn { get; set; }

    public string ShortDescription { get; set; } = string.Empty;

    public string? Description { get; set; }

    public string? ImageUrl { get; set; }

    public List<string> Gallery { get; set; } = [];

    public List<string> AvailableSizes { get; set; } = [];

    public List<string> UsageInstructions { get; set; } = [];

    public List<ProductSpecification> Specifications { get; set; } = [];

    public bool IsFeatured { get; set; }

    public bool IsActive { get; set; } = true;

    public bool IsDemo { get; set; }

    public int CategoryId { get; set; }

    public Category Category { get; set; } = null!;

    public void Activate() => IsActive = true;

    public void Deactivate() => IsActive = false;

    public void Feature(bool featured) => IsFeatured = featured;

    public void SetSpecifications(IEnumerable<ProductSpecification> specifications)
    {
        ArgumentNullException.ThrowIfNull(specifications);
        Specifications = specifications.ToList();
    }

    public void EnsureValid()
    {
        if (string.IsNullOrWhiteSpace(Slug))
        {
            throw new DomainException("Product slug is required.");
        }

        if (string.IsNullOrWhiteSpace(NameAr))
        {
            throw new DomainException("Product name is required.");
        }

        if (CategoryId <= 0)
        {
            throw new DomainException("Product must belong to a category.");
        }
    }
}

/// <summary>A single label/value row displayed in the product specification table.</summary>
public sealed class ProductSpecification
{
    public string Label { get; set; } = string.Empty;

    public string Value { get; set; } = string.Empty;
}
