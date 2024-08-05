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
                    return Result<List<ConsumedFoodDto>>.Failure("User or diet goal not found.");
                }

                var dietGoalFoods = await _context.DietGoalFoods
                    .Include(df => df.Food)
                    .Where(df => df.GoalId == user.DietGoal.Id)
                    .Select(df => new ConsumedFoodDto
                        {
                            Id = df.Food.Id,
                            name = df.Food.Name,
                            calories = df.Food.Calories,
                            proteins = df.Food.Proteins,
                            carbs = df.Food.Carbs,
                            fats = df.Food.Fats,
                            Caffeine = df.Food.Caffeine,
                            Sugars = df.Food.Sugars,
                            Fiber = df.Food.Fiber,
                            Calcium = df.Food.Calcium,
                            Iron = df.Food.Iron,
                            Magnesium = df.Food.Magnesium,
                            Potassium = df.Food.Potassium,
                            Sodium = df.Food.Sodium,
                            Zinc = df.Food.Zinc,
                            Retinol = df.Food.Retinol,
                            VitaminA = df.Food.VitaminA,
                            BetaCarotene = df.Food.BetaCarotene,
                            VitaminD = df.Food.VitaminD,
                            VitaminC = df.Food.VitaminC,
                            Folate = df.Food.Folate,
                            VitaminB12 = df.Food.VitaminB12,
                            VitaminK = df.Food.VitaminK,
                            Cholesterol = df.Food.Cholesterol,
                            SaturatedFattyAcids = df.Food.SaturatedFattyAcids,
                            MonounsaturatedFattyAcids = df.Food.MonounsaturatedFattyAcids,
                            PolyunsaturatedFattyAcids = df.Food.PolyunsaturatedFattyAcids,
                            amountConsumed = df.amountConsumed 
                        })
                    .ToListAsync(cancellationToken);

                 return Result<List<ConsumedFoodDto>>.Success(dietGoalFoods);
            }

            
        }   
    }
}