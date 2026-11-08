namespace ElGeoushy.Api.Contracts;

public sealed record CreateProductRequest(
    string Slug,
    string NameAr,
    string? NameEn,
    string ShortDescription,
    string? Description,
    string? ImageUrl,
    int CategoryId,
    bool IsFeatured = false,
    bool IsDemo = false);
