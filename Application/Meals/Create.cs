using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Meals
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Meal Meal { get; set; }
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
                     var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == userName, cancellationToken);

                    if (string.IsNullOrEmpty(userName))
                    {
                        return Result<Unit>.Failure("Username is null or empty.");
                    }

                    if (user == null)
                    {
                        return Result<Unit>.Failure($"User with username '{userName}' not found in the database.");
                    }

                    var newMeal = new Meal
                    {
                        name = request.Meal.name,
                        description = request.Meal.description,
                        calories = request.Meal.calories,
                        proteins = request.Meal.proteins,
                        carbs = request.Meal.carbs,
                        fats = request.Meal.fats,
                        Caffeine = request.Meal.Caffeine,
                        Sugars = request.Meal.Sugars,
                        Fiber = request.Meal.Fiber,
                        Calcium = request.Meal.Calcium,
                        Iron = request.Meal.Iron,
                        Magnesium = request.Meal.Magnesium,
                        Potassium = request.Meal.Potassium,
                        Sodium = request.Meal.Sodium,
                        Zinc = request.Meal.Zinc,
                        Retinol = request.Meal.Retinol,
                        VitaminA = request.Meal.VitaminA,
                        BetaCarotene = request.Meal.BetaCarotene,
                        VitaminD = request.Meal.VitaminD,
                        VitaminC = request.Meal.VitaminC,
                        Folate = request.Meal.Folate,
                        VitaminB12 = request.Meal.VitaminB12,
                        VitaminK = request.Meal.VitaminK,
                        Cholesterol = request.Meal.Cholesterol,
                        SaturatedFattyAcids = request.Meal.SaturatedFattyAcids,
                        MonounsaturatedFattyAcids = request.Meal.MonounsaturatedFattyAcids,
                        PolyunsaturatedFattyAcids = request.Meal.PolyunsaturatedFattyAcids,
                        quantity= request.Meal.quantity
                        
                    };
                    _context.Meals.Add(newMeal);
                    user.Meals.Add(newMeal);
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
