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

        public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _userAccessor = userAccessor ?? throw new ArgumentNullException(nameof(userAccessor));
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            try
            {   
                var userName = _userAccessor.GetUsername();
                Console.WriteLine($"Username in Handler 1: {userName}");

                if (string.IsNullOrEmpty(userName))
                {
                    return Result<Unit>.Failure("Username is null or empty.");
                }

                var user = await _context.Users.Include(u => u.DietGoal).FirstOrDefaultAsync(x => x.UserName == userName, cancellationToken);

                if (user == null)
                {
                    return Result<Unit>.Failure($"User with username '{userName}' not found in the database.");
                }

                if (user.DietGoal == null)
                {
                    return Result<Unit>.Failure($"User with username '{userName}' does not have a diet goal.");
                }
            
                Console.WriteLine($"#####Username in Handler 2: {user.UserName}");
            
                var meal = await _context.Meals.FindAsync(request.MealId);
                Console.WriteLine($"#####meal in Handler 3: {meal.name}");
                if (meal == null)
                {
                    return Result<Unit>.Failure("meal not found.");
                }

                if (request == null)
                {
                    return Result<Unit>.Failure("Request is null");
                }

                // Check if there's an existing relationship with the same MealId in the user's diet goal
                var existingDietGoalMeal = _context.DietGoalMeals.FirstOrDefault(df => df.MealId == request.MealId);
               
                if (existingDietGoalMeal != null)
                {
                    // Update relevant properties like quantity or any other property
                    existingDietGoalMeal.Quantity += 1; // Example: Increment the quantity by 1
                }
                else
                {
                    var newDietGoalMeal = new DietGoalMeals 
                    { 
                        DietGoal = user.DietGoal, 
                        Meal = meal,
                        Quantity = 1 // Example: Set the initial quantity to 1
                    };
                    user.DietGoal.Meals.Add(newDietGoalMeal);
                }

                var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating database.");
            }
            catch (Exception ex)
            {
                return Result<Unit>.Failure($"problem adding food: {ex.Message}");
            }
        }
    }
}

}