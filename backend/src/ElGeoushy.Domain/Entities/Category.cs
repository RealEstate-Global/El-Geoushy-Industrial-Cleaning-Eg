using ElGeoushy.Domain.Common;
using ElGeoushy.Domain.Exceptions;

namespace ElGeoushy.Domain.Entities;

/// <summary>A product category shown in the storefront catalog.</summary>
public sealed class Category : BaseAuditableEntity
{
    public string Slug { get; set; } = string.Empty;

    public string NameAr { get; set; } = string.Empty;

    public string? NameEn { get; set; }

    public string? Description { get; set; }

    public string? ImageUrl { get; set; }

    public int SortOrder { get; set; }

    public ICollection<Product> Products { get; set; } = new List<Product>();

    public void Rename(string nameAr)
    {
        if (string.IsNullOrWhiteSpace(nameAr))
        {
            throw new DomainException("Category name is required.");
        }

        NameAr = nameAr.Trim();
    }
}
