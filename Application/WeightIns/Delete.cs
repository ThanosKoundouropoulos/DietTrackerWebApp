

using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application.WeightIns
{
   public class Delete
{
    public class Command : IRequest<Result<Unit>>
    {
        public Guid Id { get; set; }
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
            var weightIn = await _context.WeightIns.FindAsync(request.Id);

            if (weightIn == null)
                return Result<Unit>.Failure("WeightIn not found 1");

            _context.Remove(weightIn);

            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!result)
                return Result<Unit>.Failure("Failed to delete weightIn");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
    
}
