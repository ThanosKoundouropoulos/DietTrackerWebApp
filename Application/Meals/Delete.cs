using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;




namespace Application.Meals
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        
        }

       public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context ?? throw new ArgumentNullException(nameof(context));
                _userAccessor = userAccessor ?? throw new ArgumentNullException(nameof(userAccessor));
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                try
                {
                    var userName = _userAccessor.GetUsername();

                    if (string.IsNullOrEmpty(userName))
                    {
                        return Result<Unit>.Failure("Username is null or empty.");
                    }

                    var user = await _context.Users
                        .Include(u => u.Meals) // Ensure to include user's meals
                        .FirstOrDefaultAsync(x => x.UserName == userName, cancellationToken);

                    if (user == null)
                    {
                        return Result<Unit>.Failure($"User with username '{userName}' not found.");
                    }

                    var meal = user.Meals.FirstOrDefault(m => m.Id == request.Id);

                    if (meal != null)
                    {
                        // Remove meal from user's collection
                        user.Meals.Remove(meal);
                        _context.Meals.Remove(meal);
                    }
                    else
                    {
                        return Result<Unit>.Failure("Meal not found in user's collection.");
                    }

                    var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                    return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating database.");
                }
                catch (Exception ex)
                {
                    return Result<Unit>.Failure($"Problem deleting meal: {ex.Message}");
                }
            }
        }

    }
}
