namespace ElGeoushy.Api.Contracts;

/// <summary>Payload sent by the frontend `reportError` helper.</summary>
public sealed record ClientErrorRequest(
    string? Message,
    string? Stack,
    string? Route,
    string? Mechanism,
    string? Timestamp);
