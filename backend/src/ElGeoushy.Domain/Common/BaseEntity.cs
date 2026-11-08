namespace ElGeoushy.Domain.Common;

/// <summary>Base type for every persisted domain entity.</summary>
public abstract class BaseEntity
{
    public int Id { get; set; }
}
