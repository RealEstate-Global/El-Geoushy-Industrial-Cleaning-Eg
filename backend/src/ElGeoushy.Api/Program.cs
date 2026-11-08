using ElGeoushy.Api.Endpoints;
using ElGeoushy.Api.Middleware;
using ElGeoushy.Application;
using ElGeoushy.Infrastructure;
using ElGeoushy.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

builder.Services.AddProblemDetails();
builder.Services.AddExceptionHandler<DomainExceptionHandler>();
builder.Services.AddOpenApi();

var allowedOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>() ?? ["http://localhost:8080"];

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy => policy
        .WithOrigins(allowedOrigins)
        .AllowAnyHeader()
        .AllowAnyMethod());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseExceptionHandler();
app.UseCors("Frontend");

app.MapGet("/", () => Results.Ok(new
{
    name = "ElGeoushy API",
    docs = "/openapi/v1.json",
    health = "/health",
}));

app.MapHealthEndpoints();
app.MapCategoryEndpoints();
app.MapProductEndpoints();
app.MapContactEndpoints();
app.MapClientErrorEndpoints();

await DbInitializer.InitializeAsync(app.Services);

app.Run();

/// <summary>Exposed so integration tests can use WebApplicationFactory&lt;Program&gt;.</summary>
public partial class Program;
