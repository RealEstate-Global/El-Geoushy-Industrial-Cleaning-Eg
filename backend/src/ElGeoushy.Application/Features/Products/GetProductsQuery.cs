using ElGeoushy.Application.Common.Interfaces;
using ElGeoushy.Application.Common.Models;
using Microsoft.EntityFrameworkCore;

namespace ElGeoushy.Application.Features.Products;

public sealed record GetProductsQuery(
    string? Category = null,
    string? Search = null,
    string? Sort = null,
    int Page = 1,
    int PageSize = 20);

public sealed class GetProductsQueryHandler(IApplicationDbContext db)
{
    public async Task<PagedResult<ProductDto>> HandleAsync(
        GetProductsQuery query,
        CancellationToken cancellationToken = default)
    {
        var products = db.Products
            .AsNoTracking()
            .Include(p => p.Category)
            .Where(p => p.IsActive);

        if (!string.IsNullOrWhiteSpace(query.Category))
        {
            var category = query.Category.Trim();
            products = products.Where(p => p.Category.Slug == category);
        }

        if (!string.IsNullOrWhiteSpace(query.Search))
        {
            var search = query.Search.Trim();
            products = products.Where(p =>
                p.NameAr.Contains(search) ||
                p.ShortDescription.Contains(search));
        }

        var page = query.Page < 1 ? 1 : query.Page;
        var pageSize = query.PageSize is < 1 or > 100 ? 20 : query.PageSize;
        var totalCount = await products.CountAsync(cancellationToken);

        var ordered = query.Sort switch
        {
            "name-asc" => products.OrderBy(p => p.NameAr),
            "name-desc" => products.OrderByDescending(p => p.NameAr),
            _ => products.OrderByDescending(p => p.IsFeatured).ThenBy(p => p.NameAr),
        };

        var items = await ordered
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);

        var dtos = items.Select(p => p.ToDto()).ToList();
        return new PagedResult<ProductDto>(dtos, page, pageSize, totalCount);
    }
}
