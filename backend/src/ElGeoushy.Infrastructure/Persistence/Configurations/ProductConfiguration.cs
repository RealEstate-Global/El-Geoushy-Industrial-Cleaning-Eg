using ElGeoushy.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ElGeoushy.Infrastructure.Persistence.Configurations;

public sealed class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.ToTable("Products");

        builder.HasKey(p => p.Id);

        builder.Property(p => p.Slug).HasMaxLength(160).IsRequired();
        builder.Property(p => p.NameAr).HasMaxLength(200).IsRequired();
        builder.Property(p => p.NameEn).HasMaxLength(200);
        builder.Property(p => p.ShortDescription).HasMaxLength(500).IsRequired();
        builder.Property(p => p.Description).HasMaxLength(4000);
        builder.Property(p => p.ImageUrl).HasMaxLength(500);

        builder.HasIndex(p => p.Slug).IsUnique();
        builder.HasIndex(p => new { p.CategoryId, p.IsActive });

        builder.HasOne(p => p.Category)
            .WithMany(c => c.Products)
            .HasForeignKey(p => p.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.OwnsMany(p => p.Specifications, specifications =>
        {
            specifications.ToTable("ProductSpecifications");
            specifications.WithOwner().HasForeignKey("ProductId");
            specifications.Property(s => s.Label).HasMaxLength(120).IsRequired();
            specifications.Property(s => s.Value).HasMaxLength(500).IsRequired();
        });
    }
}
