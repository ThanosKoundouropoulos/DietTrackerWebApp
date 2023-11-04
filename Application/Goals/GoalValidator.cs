using Domain;
using FluentValidation;

namespace Application.Goals
{
    public class GoalValidator : AbstractValidator<DietGoal>
    {
          public GoalValidator()
        {
            RuleFor(x => x.calories).NotEmpty();
            RuleFor(x => x.proteins).NotEmpty();
            RuleFor(x => x.fats).NotEmpty();
            RuleFor(x => x.carbs).NotEmpty();
           
        }
    }
}