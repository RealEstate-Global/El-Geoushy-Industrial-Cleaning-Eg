using ElGeoushy.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace ElGeoushy.Infrastructure.Persistence;

/// <summary>
/// Creates the local SQLite database on first run and seeds the demo catalog.
/// Replace with EF Core migrations when the schema is finalized.
/// </summary>
public static class DbInitializer
{
    public static async Task InitializeAsync(
        IServiceProvider serviceProvider,
        CancellationToken cancellationToken = default)
    {
        using var scope = serviceProvider.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        await db.Database.EnsureCreatedAsync(cancellationToken);

        if (await db.Categories.AnyAsync(cancellationToken))
        {
            return;
        }

        var industrial = new Category
        {
            Slug = "industrial",
            NameAr = "منظفات صناعية",
            Description = "حلول تنظيف للمصانع والورش والمنشآت ذات الاستخدام الكثيف.",
            ImageUrl = "/assets/categories/industrial-cleaning.webp",
            SortOrder = 1,
        };

        var household = new Category
        {
            Slug = "household",
            NameAr = "منظفات منزلية",
            Description = "منتجات للاستخدام اليومي في المطبخ والحمام وأسطح البيت.",
            ImageUrl = "/assets/categories/household-cleaning.webp",
            SortOrder = 2,
        };

        var detergents = new Category
        {
            Slug = "detergents",
            NameAr = "منظفات سائلة",
            Description = "سوائل تنظيف وغسيل بعبوات وأحجام مختلفة.",
            ImageUrl = "/assets/categories/detergents.webp",
            SortOrder = 3,
        };

        db.Categories.AddRange(industrial, household, detergents);

        const string placeholder = "/assets/products/product-placeholder.webp";

        db.Products.AddRange(
            DemoProduct("demo-floor-cleaner", "منظف أرضيات (تجريبي)", household, "منتج تجريبي لتنظيف الأرضيات.", true),
            DemoProduct("demo-dish-liquid", "سائل أطباق (تجريبي)", detergents, "منتج تجريبي لغسيل الأطباق.", true),
            DemoProduct("demo-degreaser", "مزيل دهون صناعي (تجريبي)", industrial, "منتج تجريبي لإزالة الدهون.", true),
            DemoProduct("demo-glass-cleaner", "منظف زجاج (تجريبي)", household, "منتج تجريبي لتنظيف الأسطح الزجاجية.", true),
            DemoProduct("demo-laundry-liquid", "سائل غسيل ملابس (تجريبي)", detergents, "منتج تجريبي لغسيل الملابس.", false),
            DemoProduct("demo-multi-surface", "منظف متعدد الأسطح (تجريبي)", household, "منتج تجريبي لأسطح متعددة.", false),
            DemoProduct("demo-industrial-floor", "منظف أرضيات صناعي (تجريبي)", industrial, "منتج تجريبي لأرضيات المنشآت.", false),
            DemoProduct("demo-hand-soap", "صابون أيدي سائل (تجريبي)", detergents, "منتج تجريبي لغسيل الأيدي.", false));

        await db.SaveChangesAsync(cancellationToken);

        static Product DemoProduct(string slug, string name, Category category, string shortDescription, bool featured) =>
            new()
            {
                Slug = slug,
                NameAr = name,
                ShortDescription = shortDescription,
                Description = $"{shortDescription} هذا وصف تجريبي لعرض شكل صفحة المنتج، وسيتم استبداله بالبيانات الرسمية للمنتج.",
                ImageUrl = placeholder,
                Category = category,
                IsFeatured = featured,
                IsActive = true,
                IsDemo = true,
            };
    }
}
