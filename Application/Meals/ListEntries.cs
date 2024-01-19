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
                            quantity = df.Quantity
                        })
                    .ToListAsync(cancellationToken);

                 return Result<List<ConsumedMealDto>>.Success(dietGoalMeals);
            }
        }
    }
}