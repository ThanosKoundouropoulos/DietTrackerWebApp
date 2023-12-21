using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Goals
{
    public class Details
    {
        public class Query : IRequest<Result<DietGoalDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<DietGoalDto>>
        {

            private readonly DataContext _contex;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _contex = context;
            }

            public async Task<Result<DietGoalDto>> Handle(Query request, CancellationToken cancellationToken)
            {

                /*var dietGoal = await _contex.DietGoals.Include(f => f.Foods)
                    .ProjectTo<DietGoalDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);*/
                    var dietGoal = await _contex.DietGoals
                        .Include(d => d.Foods)
                        .Where(d => d.Id == request.Id)
                        .ProjectTo<DietGoalDto>(_mapper.ConfigurationProvider)
                        .FirstOrDefaultAsync();

                return Result<DietGoalDto>.Success(dietGoal);
            }
        }
    }
}