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
                
                    var food = await _context.Foods.FindAsync(request.FoodId);
    
                    if (food == null)
                    {
                        return Result<Unit>.Failure("Food not found.");
                    }

                    if (request == null)
                    {
                        return Result<Unit>.Failure("Request is null");
                    }

                    var existingDietGoalFood = _context.DietGoalFoods
                        .FirstOrDefault(df => df.FoodId == request.FoodId);
                   
                    if (existingDietGoalFood != null)
                    {
                        existingDietGoalFood.amountConsumed += request.amountConsumed;
                    }
                    else
                    {
                      
                        var newDietGoalFood = new DietGoalFoods 
                        { 
                            DietGoal = user.DietGoal, 
                            Food = food,
                            amountConsumed = request.amountConsumed 
                        };
                        user.DietGoal.Foods.Add(newDietGoalFood);
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