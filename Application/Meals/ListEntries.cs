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
    public class ListEntries
    {
        public class Query : IRequest<Result<List<ConsumedMealDto>>> 
        {
            public Guid GoalId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<ConsumedMealDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper,IUserAccessor userAccessor)
            {
                _context = context ?? throw new ArgumentNullException(nameof(context));
                _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
                 _userAccessor = userAccessor;
            }

            public async Task<Result<List<ConsumedMealDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                  var user = await _context.Users
                    .Include(u => u.DietGoal)
                    .FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());

                if (user == null || user.DietGoal == null)
                {
                    return Result<List<ConsumedMealDto>>.Failure("User or diet goal not found.");
                }

                var dietGoalMeals = await _context.DietGoalMeals
                    .Include(df => df.Meal)
                    .Where(df => df.GoalId == user.DietGoal.Id)
                    .Select(df => new ConsumedMealDto
                        {
                            Id = df.Meal.Id,
                            name = df.Meal.name,
                            description = df.Meal.description,
                            calories = df.Meal.calories,
                            proteins = df.Meal.proteins,
                            carbs = df.Meal.carbs,
                            fats = df.Meal.fats,
                            Caffeine = df.Meal.Caffeine,
                            Sugars = df.Meal.Sugars,
                            Fiber = df.Meal.Fiber,
                            Calcium = df.Meal.Calcium,
                            Iron = df.Meal.Iron,
                            Magnesium = df.Meal.Magnesium,
                            Potassium = df.Meal.Potassium,
                            Sodium = df.Meal.Sodium,
                            Zinc = df.Meal.Zinc,
                            Retinol = df.Meal.Retinol,
                            VitaminA = df.Meal.VitaminA,
                            BetaCarotene = df.Meal.BetaCarotene,
                            VitaminD = df.Meal.VitaminD,
                            VitaminC = df.Meal.VitaminC,
                            Folate = df.Meal.Folate,
                            VitaminB12 = df.Meal.VitaminB12,
                            VitaminK = df.Meal.VitaminK,
                            Cholesterol = df.Meal.Cholesterol,
                            SaturatedFattyAcids = df.Meal.SaturatedFattyAcids,
                            MonounsaturatedFattyAcids = df.Meal.MonounsaturatedFattyAcids,
                            PolyunsaturatedFattyAcids = df.Meal.PolyunsaturatedFattyAcids,
                            quantity = df.Quantity
                        })
                    .ToListAsync(cancellationToken);

                 return Result<List<ConsumedMealDto>>.Success(dietGoalMeals);
            }
        }
    }
}