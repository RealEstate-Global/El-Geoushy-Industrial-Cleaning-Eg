using ElGeoushy.Domain.Entities;
using ElGeoushy.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace ElGeoushy.Application.UnitTests;

internal static class TestDb
{
    public static ApplicationDbContext Create()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase($"elgeoushy-tests-{Guid.NewGuid():N}")
            .Options;

        return new ApplicationDbContext(options);
    }

    public static async Task<(ApplicationDbContext Db, Category Household, Category Industrial)> SeedAsync()
    {
        var db = Create();

        var household = new Category { Slug = "household", NameAr = "منظفات منزلية", SortOrder = 2 };
        var industrial = new Category { Slug = "industrial", NameAr = "منظفات صناعية", SortOrder = 1 };

        db.Categories.AddRange(household, industrial);
        db.Products.AddRange(
            new Product
            {
                Slug = "floor-cleaner",
                NameAr = "منظف أرضيات",
                ShortDescription = "For floors.",
                Category = household,
                IsFeatured = true,
            },
            new Product
            {
                Slug = "degreaser",
                NameAr = "مزيل دهون",
                ShortDescription = "For workshops.",
                Category = industrial,
            });

        await db.SaveChangesAsync();
        return (db, household, industrial);
    }
}
