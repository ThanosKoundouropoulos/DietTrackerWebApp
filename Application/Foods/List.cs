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
    public class List
    {

        public class Query : IRequest<Result<List<ConsumedFoodDto>>> { }


        
        public class Handler : IRequestHandler<Query, Result<List<ConsumedFoodDto>>>
        {

           
            private readonly DataContext _context;
             private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<List<ConsumedFoodDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .Include(u => u.DietGoal)
                    .FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());

                if (user == null || user.DietGoal == null)
                {
                    // Handle the case where the user or diet goal is not found
                    return Result<List<ConsumedFoodDto>>.Failure("User or diet goal not found.");
                }

                var dietGoalFoods = await _context.DietGoalFoods
                    .Include(df => df.Food)
                    .Where(df => df.GoalId == user.DietGoal.Id)
                    .Select(df => new ConsumedFoodDto
                        {
                            Id = df.Food.Id,
                            name = df.Food.name,
                            calories = df.Food.calories,
                            proteins = df.Food.proteins,
                            carbs = df.Food.carbs,
                            fats = df.Food.fats,
                            amountConsumed = df.amountConsumed 
                        })
                    .ToListAsync(cancellationToken);

                 return Result<List<ConsumedFoodDto>>.Success(dietGoalFoods);
            }

            
        }   
    }
}