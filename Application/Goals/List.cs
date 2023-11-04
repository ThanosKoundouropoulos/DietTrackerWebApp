using Application.Core;
using Application.Goals;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Goals
{
    public class List
    {

        public class Query : IRequest<Result<List<DietGoalDto>>> { }


        
        public class Handler : IRequestHandler<Query, Result<List<DietGoalDto>>>
        {

           
            private readonly DataContext _contex;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _contex = context;
            }

            public async Task<Result<List<DietGoalDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var dietGoals = await _contex.DietGoals
                    .ProjectTo<DietGoalDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);
                
                return Result<List<DietGoalDto>>.Success(dietGoals);
            }

            
        }   
    }
}