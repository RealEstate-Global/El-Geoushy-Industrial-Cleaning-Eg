namespace ElGeoushy.Domain.Common;

/// <summary>Entity with created/updated timestamps maintained by the persistence layer.</summary>
public abstract class BaseAuditableEntity : BaseEntity
{
    public DateTimeOffset CreatedAt { get; set; }

    public DateTimeOffset? UpdatedAt { get; set; }
}
