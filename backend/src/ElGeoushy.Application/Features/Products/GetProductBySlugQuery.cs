using ElGeoushy.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ElGeoushy.Application.Features.Products;

public sealed record GetProductBySlugQuery(string Slug);

public sealed class GetProductBySlugQueryHandler(IApplicationDbContext db)
{
    public async Task<ProductDto?> HandleAsync(
        GetProductBySlugQuery query,
        CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(query.Slug))
        {
            return null;
        }

        var slug = query.Slug.Trim();
        var product = await db.Products
            .AsNoTracking()
            .Include(p => p.Category)
            .FirstOrDefaultAsync(p => p.Slug == slug && p.IsActive, cancellationToken);

        return product?.ToDto();
    }
}
