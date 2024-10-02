using Application.Core;
using Application.Goals;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Meals
{
   public class Add
{
    public class Command : IRequest<Result<Unit>> 
    { 
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

                var user = await _context.Users
                    .Include(u => u.DietGoal) 
                    .FirstOrDefaultAsync(x => x.UserName == userName, cancellationToken);

                if (user == null)
                {
                    return Result<Unit>.Failure($"User with username '{userName}' not found.");
                }

                if (user.DietGoal == null)
                {
                    return Result<Unit>.Failure($"User with username '{userName}' does not have a diet goal.");
                }

                var meal = await _context.Meals
                    .FirstOrDefaultAsync(m => m.Id == request.MealId, cancellationToken);

                if (meal == null)
                {
                    return Result<Unit>.Failure("Meal not found.");
                }

                // Check if the meal is already associated with the user's diet goal
                var existingMeal = user.DietGoal.Meals.FirstOrDefault(m => m.Id == request.MealId);

                if (existingMeal != null)
                {
                    // Increment the quantity
                    existingMeal.quantity += 1;
                }
                else
                {
                    // Associate the meal with the user's diet goal
                    meal.DietGoalId = user.DietGoal.Id;
                    meal.quantity = 1; // Set initial quantity to 1
                   
                }

                var result = await _context.SaveChangesAsync(cancellationToken) > 0;
                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating database.");
            }
            catch (Exception ex)
            {
                return Result<Unit>.Failure($"Problem adding meal: {ex.Message}");
            }
        }
    }
}

}