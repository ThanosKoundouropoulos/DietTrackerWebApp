

using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application.WeightIns
{
     public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public WeightIn WeightIn { get; set; }
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
            Console.WriteLine("Date in Handler1: " + request.WeightIn.DateRecorded);
            if (user == null)
                return Result<Unit>.Failure("User not found");

            var weightIn = new WeightIn
            {
                AppUser = user,
                Weight = request.WeightIn.Weight,
                DateRecorded = request.WeightIn.DateRecorded // Assign string date directly
            };

            Console.WriteLine("Date in Handler2: " + weightIn.DateRecorded);

            _context.WeightIn.Add(weightIn);
            user.WeightIns.Add(weightIn);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result)
                return Result<Unit>.Failure("Failed to add weight in");

            return Result<Unit>.Success(Unit.Value);
        }
        }
    }
}
