using System.Net;
using System.Net.Http.Json;
using ElGeoushy.Infrastructure.Persistence;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace ElGeoushy.Api.IntegrationTests;

public sealed class ApiEndpointTests
{
    [Fact]
    public async Task Production_does_not_allow_product_creation()
    {
        using var factory = new ApiFactory("Production");
        using var client = factory.CreateClient();

        var response = await client.PostAsJsonAsync("/api/products", new { nameAr = "Product" });

        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task Contact_form_persists_subject_and_rejects_oversized_fields()
    {
        using var factory = new ApiFactory("Development");
        using var client = factory.CreateClient();
        var payload = new
        {
            name = "Test customer",
            phone = "01012345678",
            email = "test@example.com",
            subject = "Product inquiry",
            message = "Please send product details.",
        };

        var response = await client.PostAsJsonAsync("/api/contact", payload);
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);

        using var scope = factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        Assert.Equal("Product inquiry", await db.ContactMessages.Select(x => x.Subject).SingleAsync());

        var invalid = await client.PostAsJsonAsync("/api/contact", new
        {
            name = new string('x', 201),
            phone = payload.phone,
            email = payload.email,
            subject = payload.subject,
            message = payload.message,
        });
        Assert.Equal(HttpStatusCode.BadRequest, invalid.StatusCode);
    }

    [Fact]
    public async Task Contact_endpoint_returns_429_after_five_requests_in_a_window()
    {
        using var factory = new ApiFactory("Development");
        using var client = factory.CreateClient();
        var payload = new
        {
            name = "Test customer",
            phone = "01012345678",
            email = "",
            subject = "Product inquiry",
            message = "Please send product details.",
        };

        HttpResponseMessage? last = null;
        for (var i = 0; i < 6; i++)
        {
            last?.Dispose();
            last = await client.PostAsJsonAsync("/api/contact", payload);
        }

        Assert.Equal((HttpStatusCode)429, last!.StatusCode);
        last.Dispose();
    }

    [Fact]
    public async Task Client_error_endpoint_rejects_oversized_fields_and_rate_limits()
    {
        using var factory = new ApiFactory("Development");
        using var client = factory.CreateClient();

        var oversized = await client.PostAsJsonAsync("/api/client-errors", new { message = new string('x', 4001) });
        Assert.Equal(HttpStatusCode.BadRequest, oversized.StatusCode);

        HttpResponseMessage? last = null;
        for (var i = 0; i < 31; i++)
        {
            last?.Dispose();
            last = await client.PostAsJsonAsync("/api/client-errors", new { message = "test error" });
        }

        Assert.Equal((HttpStatusCode)429, last!.StatusCode);
        last.Dispose();
    }

    private sealed class ApiFactory(string environment) : WebApplicationFactory<Program>
    {
        private readonly SqliteConnection connection = new("Data Source=:memory:");

        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            connection.Open();
            builder.UseEnvironment(environment);
            builder.ConfigureAppConfiguration((_, config) => config.AddInMemoryCollection(
                new Dictionary<string, string?> { ["ConnectionStrings:DefaultConnection"] = "Data Source=:memory:" }));
            builder.ConfigureServices(services =>
            {
                services.RemoveAll<ApplicationDbContext>();
                services.RemoveAll<DbContextOptions<ApplicationDbContext>>();
                services.AddDbContext<ApplicationDbContext>(options => options.UseSqlite(connection));
            });
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
            if (disposing) connection.Dispose();
        }
    }
}
