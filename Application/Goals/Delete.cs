
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Goals
{
    public class Delete
    {
          public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private readonly DataContext _context;
           
           
            public Handler(DataContext context)
            {
 
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var dietGoal = await _context.DietGoals.FindAsync(request.Id);

                if(dietGoal == null) return null;
                _context.Remove(dietGoal);
                
                var result = await _context.SaveChangesAsync() >0;

                if(!result) return Result<Unit>.Failure("Failed to delete activity");
                
                return Result<Unit>.Success(Unit.Value);


            }
        }
    }
}