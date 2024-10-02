using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;




namespace Application.Meals
{
    public class DeleteEntry
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid GoalId { get; set; }
            public Guid MealId { get; set; }
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

                    // Retrieve the meal directly by MealId and include the associated DietGoal
                    var meal = await _context.Meals
                        .FirstOrDefaultAsync(m => m.Id == request.MealId && m.DietGoalId == request.GoalId, cancellationToken);

                    if (meal == null)
                    {
                        return Result<Unit>.Failure("Meal not found or not associated with the specified diet goal.");
                    }

                    // Disassociate the meal from the diet goal
                    meal.DietGoalId = null;

                    // Save changes to the database
                    var result = await _context.SaveChangesAsync(cancellationToken) > 0;
                    return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating database.");
                }
                catch (Exception ex)
                {
                    return Result<Unit>.Failure($"Problem removing meal: {ex.Message}");
                }
            }
        }
    }
}
