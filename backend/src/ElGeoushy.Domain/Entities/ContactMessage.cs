using ElGeoushy.Domain.Common;

namespace ElGeoushy.Domain.Entities;

/// <summary>A message submitted from the storefront contact form.</summary>
public sealed class ContactMessage : BaseAuditableEntity
{
    public string Name { get; set; } = string.Empty;

    public string Phone { get; set; } = string.Empty;

    public string? Email { get; set; }

    public string Message { get; set; } = string.Empty;

    public ContactMessageStatus Status { get; set; } = ContactMessageStatus.New;
}

public enum ContactMessageStatus
{
    New = 0,
    InProgress = 1,
    Answered = 2,
    Archived = 3,
}
