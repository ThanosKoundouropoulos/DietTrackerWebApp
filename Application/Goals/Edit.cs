using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
using Application.Goals;
using Application.Core;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.Goals
{
    public class Edit
    {
         public class Command : IRequest<Result<Unit>>
        {
            public DietGoal DietGoal { get; set; }
        }

          public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DietGoal).SetValidator(new GoalValidator());
            }
        }
    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public Handler(DataContext context, IUserAccessor userAccessor)
        {
            _userAccessor = userAccessor;
            _context = context;
        }

       public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x =>
                x.UserName == _userAccessor.GetUsername());

            if (user == null)
                return Result<Unit>.Failure("User not found");

            var existingDietGoal = await _context.DietGoals
                .FirstOrDefaultAsync(dg => dg.AppUserId == user.Id);

            if (existingDietGoal == null)
                return Result<Unit>.Failure("DietGoal not found");

            existingDietGoal.calories = request.DietGoal.calories;
            existingDietGoal.proteins = request.DietGoal.proteins;
            existingDietGoal.carbs = request.DietGoal.carbs;
            existingDietGoal.fats = request.DietGoal.fats;

            try
            {
                var result = await _context.SaveChangesAsync(cancellationToken);
                if (result > 0)
                    return Result<Unit>.Success(Unit.Value);
                else
                    return Result<Unit>.Failure("No changes were made to DietGoal");
            }
            catch (Exception ex)
            {
                return Result<Unit>.Failure($"Failed to update DietGoal. Error: {ex.Message}");
            }
        }
    }
    }
}