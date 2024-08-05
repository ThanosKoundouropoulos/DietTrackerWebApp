using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Foods
{
    public class Search
    {
        public class Query : IRequest<Result<List<FoodDto>>>
        {
            public string FoodName { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<FoodDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

        public async Task<Result<List<FoodDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            try
            {
                var searchTerm = request.FoodName?.ToLower() ?? string.Empty;

                Console.WriteLine($"Search Term in API: {searchTerm}");

                var foods = await _context.Foods
                    .ToListAsync(cancellationToken);

                var matchedFoods = foods
                    .Select(f => new
                    {
                        Food = f,
                        Distance = LevenshteinDistance.Compute(searchTerm, f.Name.ToLower())
                    })
                    .Where(x => x.Distance <= 15) 
                    .OrderBy(x => x.Distance)
                    .Take(5)
                    .Select(x => _mapper.Map<FoodDto>(x.Food))
                    .ToList();

                return Result<List<FoodDto>>.Success(matchedFoods);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return Result<List<FoodDto>>.Failure("An error occurred while processing the request.");
            }
        }
        }
    }
}