using Domain;

namespace Application.Goals
{
    public class DietGoalDto
    {
        public Guid Id { get; set; }
        public float calories { get; set; }
        public float proteins { get; set; }
        public float carbs { get; set; }
        public float fats { get; set; }
       
    }
}