using ElGeoushy.Application.Common.Interfaces;
using ElGeoushy.Domain.Entities;
using ElGeoushy.Domain.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace ElGeoushy.Application.Features.Products;

public sealed record CreateProductCommand(
    string Slug,
    string NameAr,
    string? NameEn,
    string ShortDescription,
    string? Description,
    string? ImageUrl,
    int CategoryId,
    bool IsFeatured = false,
    bool IsDemo = false);

public sealed class CreateProductCommandHandler(IApplicationDbContext db)
{
    public async Task<ProductDto> HandleAsync(
        CreateProductCommand command,
        CancellationToken cancellationToken = default)
    {
        var slug = command.Slug.Trim().ToLowerInvariant();

        if (await db.Products.AnyAsync(p => p.Slug == slug, cancellationToken))
        {
            throw new DomainException($"A product with slug '{slug}' already exists.");
        }

        var category = await db.Categories
            .FirstOrDefaultAsync(c => c.Id == command.CategoryId, cancellationToken)
            ?? throw new DomainException($"Category {command.CategoryId} was not found.");

        var product = new Product
        {
            Slug = slug,
            NameAr = command.NameAr.Trim(),
            NameEn = command.NameEn?.Trim(),
            ShortDescription = command.ShortDescription.Trim(),
            Description = command.Description?.Trim(),
            ImageUrl = command.ImageUrl?.Trim(),
            CategoryId = category.Id,
            Category = category,
            IsFeatured = command.IsFeatured,
            IsDemo = command.IsDemo,
        };

        product.EnsureValid();

        db.Products.Add(product);
        await db.SaveChangesAsync(cancellationToken);

        return product.ToDto();
    }
}
