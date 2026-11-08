using ElGeoushy.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ElGeoushy.Application.Features.Categories;

public sealed record CategoryDto(
    int Id,
    string Slug,
    string NameAr,
    string? NameEn,
    string? Description,
    string? ImageUrl,
    int SortOrder);

public sealed class GetCategoriesQueryHandler(IApplicationDbContext db)
{
    public async Task<IReadOnlyList<CategoryDto>> HandleAsync(CancellationToken cancellationToken = default)
    {
        return await db.Categories
            .AsNoTracking()
            .OrderBy(c => c.SortOrder)
            .ThenBy(c => c.NameAr)
            .Select(c => new CategoryDto(
                c.Id,
                c.Slug,
                c.NameAr,
                c.NameEn,
                c.Description,
                c.ImageUrl,
                c.SortOrder))
            .ToListAsync(cancellationToken);
    }
}
