
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application.Foods
{
    public class DeleteFood
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid GoalId { get; set; }
            public Guid FoodId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var dietGoalFood = await _context.DietGoalFoods
                    .FirstOrDefaultAsync(df => df.GoalId == request.GoalId && df.FoodId == request.FoodId);

                if (dietGoalFood == null) return null;

                _context.Remove(dietGoalFood);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete food from diet goal");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}