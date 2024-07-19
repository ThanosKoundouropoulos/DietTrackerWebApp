

using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application.WeightIns
{
   
    public class List
    {
        public class Query : IRequest<Result<List<WeightInDto>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<WeightInDto>>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<List<WeightInDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var username = _userAccessor.GetUsername();
                var user = await _context.Users
                    .Include(u => u.WeightIns)
                    .FirstOrDefaultAsync(x => x.UserName == username, cancellationToken);

                if (user == null)
                {
                    return Result<List<WeightInDto>>.Failure("User not found");
                }

                var weightIns = user.WeightIns
                    .Select(win => new WeightInDto
                    {
                        Id = win.Id,
                        Weight = win.Weight,
                        DateRecorded = win.DateRecorded
                    })
                    .ToList();

                return Result<List<WeightInDto>>.Success(weightIns);
            }
        }
    }
}
