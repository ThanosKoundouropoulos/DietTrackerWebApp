

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
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<List<WeightInDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
             var wins = await _context.WeightIn
                    .Select(win => new WeightInDto
                    {
                        Id = win.Id,
                        Weight = win.Weight,
                       // DateRecorded = win.DateRecorded
                    })
                    .ToListAsync(cancellationToken);

                return Result<List<WeightInDto>>.Success(wins);
        }
    }
}
}
