using Application.Goals;
using Application.Foods;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<DietGoal, DietGoalDto>()
                .ForMember(dest => dest.Foods, opt => opt.MapFrom(src => src.Foods.Select(f => f.Food)));
            CreateMap<Food, FoodDto>();
            CreateMap<DietGoalFoods, FoodDto>();
        }

       
    }
}