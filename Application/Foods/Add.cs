using Application.Core;
using Application.Goals;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Foods
{
    public class Add
    {

        public class Command : IRequest<Result<Unit>> { 
             public Guid FoodId { get; set; }
             public double amountConsumed { get; set; }
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
                    Console.WriteLine($"Username in Handler: {userName}");

                    // Check if userName is not null or empty
                    if (string.IsNullOrEmpty(userName))
                    {
                        return Result<Unit>.Failure("Username is null or empty.");
                    }

                    // Retrieve the user and their diet goal
                    var user = await _context.Users.Include(u => u.DietGoal).FirstOrDefaultAsync(x => x.UserName == userName, cancellationToken);

                    // Check if user is not found
                    if (user == null)
                    {
                        return Result<Unit>.Failure($"User with username '{userName}' not found in the database.");
                    }

                    // Check if user has a diet goal
                    if (user.DietGoal == null)
                    {
                        return Result<Unit>.Failure($"User with username '{userName}' does not have a diet goal.");
                    }
                
                    Console.WriteLine($"#####Username in Handler: {user.UserName}");
                    Console.WriteLine($"#####Amount in Handler: {request.amountConsumed}");

                    // Retrieve the food
                    var food = await _context.Foods.FindAsync(request.FoodId);
                    Console.WriteLine($"#####Food in Handler: {food.Name}");
                    if (food == null)
                    {
                        return Result<Unit>.Failure("Food not found.");
                    }

                    if (request == null)
                    {
                        // Handle the case when request is null
                        return Result<Unit>.Failure("Request is null");
                    }

                    // Check if the food is already in the diet goal
                    var existingDietGoalFood = _context.DietGoalFoods
                        .FirstOrDefault(df => df.FoodId == request.FoodId);
                   
                    if (existingDietGoalFood != null)
                    {
                        Console.WriteLine($"#####Food in Handler in Relation: {existingDietGoalFood.Food.Name}");
                        Console.WriteLine($"#####Food in Handler in Relation: {existingDietGoalFood.amountConsumed}");
                        // If the food already exists, update the amount consumed
                        existingDietGoalFood.amountConsumed += request.amountConsumed;
                    }
                    else
                    {
                        // If the food doesn't exist, create a new DietGoalFoods instance
                        var newDietGoalFood = new DietGoalFoods 
                        { 
                            DietGoal = user.DietGoal, 
                            Food = food,
                            amountConsumed = request.amountConsumed 
                        };

                        // Add the new instance to the Foods collection
                        user.DietGoal.Foods.Add(newDietGoalFood);
                    }

            

                    // Update the user in the database
                    var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                    return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating database.");
                }
                catch (Exception ex)
                {
                    return Result<Unit>.Failure($"prblem adding food: {ex.Message}");
                }
            }
        }
    }
}