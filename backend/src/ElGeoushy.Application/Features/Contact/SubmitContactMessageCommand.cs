using ElGeoushy.Application.Common.Interfaces;
using ElGeoushy.Domain.Entities;
using ElGeoushy.Domain.Exceptions;

namespace ElGeoushy.Application.Features.Contact;

public sealed record SubmitContactMessageCommand(
    string Name,
    string Phone,
    string? Email,
    string Subject,
    string Message);

public sealed class SubmitContactMessageCommandHandler(IApplicationDbContext db)
{
    public async Task<int> HandleAsync(
        SubmitContactMessageCommand command,
        CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(command.Name))
        {
            throw new DomainException("Name is required.");
        }

        if (string.IsNullOrWhiteSpace(command.Phone))
        {
            throw new DomainException("Phone is required.");
        }

        if (string.IsNullOrWhiteSpace(command.Subject))
        {
            throw new DomainException("Subject is required.");
        }

        if (string.IsNullOrWhiteSpace(command.Message))
        {
            throw new DomainException("Message is required.");
        }

        var entity = new ContactMessage
        {
            Name = command.Name.Trim(),
            Phone = command.Phone.Trim(),
            Email = string.IsNullOrWhiteSpace(command.Email) ? null : command.Email.Trim(),
            Subject = command.Subject.Trim(),
            Message = command.Message.Trim(),
        };

        db.ContactMessages.Add(entity);
        await db.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
