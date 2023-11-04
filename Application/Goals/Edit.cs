using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
using Application.Goals;
using Application.Core;

namespace Application.Goals
{
    public class Edit
    {
         public class Command : IRequest<Result<Unit>>
        {
            public DietGoal dietGoal { get; set; }
        }

          public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.dietGoal).SetValidator(new GoalValidator());
            }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
           
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var dtgoal = await _context.DietGoals.FindAsync(request.dietGoal.Id);


                if(dtgoal == null) return null;
               
                _mapper.Map(request.dietGoal,dtgoal);
                var result =await _context.SaveChangesAsync()>0;

                if(!result) return Result<Unit>.Failure("Failed to update dietgoal");
                
                return Result<Unit>.Success(Unit.Value);


            }
        }
    }
}