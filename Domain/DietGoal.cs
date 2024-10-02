using System.Text.Json.Serialization;

namespace Domain
{
    public class DietGoal
    {
        public Guid Id { get; set; }
        public float calories { get; set; }
        public float proteins { get; set; }
        public float carbs { get; set; }
        public float fats { get; set; }
        public string AppUserId { get; set; }
        [JsonIgnore]
        public AppUser AppUser { get; set; }
        public ICollection<DietGoalFoods> Foods  { get; set; } = new List<DietGoalFoods>();
        public ICollection<Meal> Meals { get; set; } = new List<Meal>();
    }
}