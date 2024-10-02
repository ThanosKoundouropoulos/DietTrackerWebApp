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
                    .Include(u => u.Meals)
                    .FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());

                if (user == null || user.DietGoal == null)
                {
                    return Result<List<ConsumedMealDto>>.Failure("User or diet goal not found.");
                }

                var dietGoalMeals = user.Meals
                    .Where(m => m.DietGoalId == user.DietGoal.Id)
                    .Select(m => new ConsumedMealDto
                    {
                        Id = m.Id,
                        name = m.name,
                        description = m.description,
                        calories = m.calories,
                        proteins = m.proteins,
                        carbs = m.carbs,
                        fats = m.fats,
                        Caffeine = m.Caffeine,
                        Sugars = m.Sugars,
                        Fiber = m.Fiber,
                        Calcium = m.Calcium,
                        Iron = m.Iron,
                        Magnesium = m.Magnesium,
                        Potassium = m.Potassium,
                        Sodium = m.Sodium,
                        Zinc = m.Zinc,
                        Retinol = m.Retinol,
                        VitaminA = m.VitaminA,
                        BetaCarotene = m.BetaCarotene,
                        VitaminD = m.VitaminD,
                        VitaminC = m.VitaminC,
                        Folate = m.Folate,
                        VitaminB12 = m.VitaminB12,
                        VitaminK = m.VitaminK,
                        Cholesterol = m.Cholesterol,
                        SaturatedFattyAcids = m.SaturatedFattyAcids,
                        MonounsaturatedFattyAcids = m.MonounsaturatedFattyAcids,
                        PolyunsaturatedFattyAcids = m.PolyunsaturatedFattyAcids,
                        quantity = m.quantity
                    })
                    .ToList();

                return Result<List<ConsumedMealDto>>.Success(dietGoalMeals);
            }
        }
    }
}