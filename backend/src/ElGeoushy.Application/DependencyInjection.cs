using ElGeoushy.Application.Features.Categories;
using ElGeoushy.Application.Features.Contact;
using ElGeoushy.Application.Features.Products;
using Microsoft.Extensions.DependencyInjection;

namespace ElGeoushy.Application;

public static class DependencyInjection
{
    /// <summary>Registers the application-layer use cases. No infrastructure types are referenced here.</summary>
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<GetProductsQueryHandler>();
        services.AddScoped<GetProductBySlugQueryHandler>();
        services.AddScoped<CreateProductCommandHandler>();
        services.AddScoped<GetCategoriesQueryHandler>();
        services.AddScoped<SubmitContactMessageCommandHandler>();

        return services;
    }
}
