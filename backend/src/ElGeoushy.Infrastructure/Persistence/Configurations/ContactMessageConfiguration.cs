using ElGeoushy.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ElGeoushy.Infrastructure.Persistence.Configurations;

public sealed class ContactMessageConfiguration : IEntityTypeConfiguration<ContactMessage>
{
    public void Configure(EntityTypeBuilder<ContactMessage> builder)
    {
        builder.ToTable("ContactMessages");

        builder.HasKey(m => m.Id);

        builder.Property(m => m.Name).HasMaxLength(200).IsRequired();
        builder.Property(m => m.Phone).HasMaxLength(40).IsRequired();
        builder.Property(m => m.Email).HasMaxLength(320);
        builder.Property(m => m.Subject).HasMaxLength(120).IsRequired();
        builder.Property(m => m.Message).HasMaxLength(4000).IsRequired();
        builder.Property(m => m.Status).HasConversion<string>().HasMaxLength(30);

        builder.HasIndex(m => m.CreatedAt);
    }
}
