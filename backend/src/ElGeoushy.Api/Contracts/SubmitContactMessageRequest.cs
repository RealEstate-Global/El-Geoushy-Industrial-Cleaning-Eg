namespace ElGeoushy.Api.Contracts;

public sealed record SubmitContactMessageRequest(
    string Name,
    string Phone,
    string? Email,
    string Message);
