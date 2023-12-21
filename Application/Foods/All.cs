using Application.Core;
using Application.Goals;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Foods
{
    public class All
    {
        public class Query : IRequest<Result<List<Food>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Food>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Food>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var foods = await _context.Foods.ToListAsync(cancellationToken);

                return Result<List<Food>>.Success(foods);
            }
        }
    }
}