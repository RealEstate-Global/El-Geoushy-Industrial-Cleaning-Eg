using ElGeoushy.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ElGeoushy.Application.Common.Interfaces;

/// <summary>
/// Persistence boundary used by the application layer. Infrastructure implements it
/// with EF Core; the application layer never references a concrete DbContext.
/// </summary>
public interface IApplicationDbContext
{
    DbSet<Product> Products { get; }

    DbSet<Category> Categories { get; }

    DbSet<ContactMessage> ContactMessages { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
