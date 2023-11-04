using Application.Goals;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
             CreateMap<DietGoal, DietGoalDto>();
        }

       
    }
}