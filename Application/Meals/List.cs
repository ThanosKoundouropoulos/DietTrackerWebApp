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
    public class List
    {
        public class Query : IRequest<Result<List<MealDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<MealDto>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context ?? throw new ArgumentNullException(nameof(context));
            }

            public async Task<Result<List<MealDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var meals = await _context.Meals
                    .Select(meal => new MealDto
                    {
                        Id = meal.Id,
                        name = meal.name,
                        description = meal.description,
                        calories = meal.calories,
                        proteins = meal.proteins,
                        carbs = meal.carbs,
                        fats = meal.fats,
                        Caffeine = meal.Caffeine,
                        Sugars = meal.Sugars,
                        Fiber = meal.Fiber,
                        Calcium = meal.Calcium,
                        Iron = meal.Iron,
                        Magnesium = meal.Magnesium,
                        Potassium = meal.Potassium,
                        Sodium = meal.Sodium,
                        Zinc = meal.Zinc,
                        Retinol = meal.Retinol,
                        VitaminA = meal.VitaminA,
                        BetaCarotene = meal.BetaCarotene,
                        VitaminD = meal.VitaminD,
                        VitaminC = meal.VitaminC,
                        Folate = meal.Folate,
                        VitaminB12 = meal.VitaminB12,
                        VitaminK = meal.VitaminK,
                        Cholesterol = meal.Cholesterol,
                        SaturatedFattyAcids = meal.SaturatedFattyAcids,
                        MonounsaturatedFattyAcids = meal.MonounsaturatedFattyAcids,
                        PolyunsaturatedFattyAcids = meal.PolyunsaturatedFattyAcids,
                    })
                    .ToListAsync(cancellationToken);

                return Result<List<MealDto>>.Success(meals);
            }
        }
    }
}
