using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;




namespace Application.Meals
{
    public class DeleteEntry
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid GoalId { get; set; }
            public Guid MealId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context ?? throw new ArgumentNullException(nameof(context));
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                Console.Write("KANOUME DELETE SXESH");
                var dietGoalMeal = await _context.DietGoalMeals
                    .FirstOrDefaultAsync(dgm => dgm.GoalId == request.GoalId && dgm.MealId == request.MealId, cancellationToken);

                if (dietGoalMeal == null)
                {
                    return Result<Unit>.Failure("Diet goal meal not found.");
                }
                
                _context.Remove(dietGoalMeal);
                var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (!result)
                {
                    return Result<Unit>.Failure("Failed to delete meal from diet goal.");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
