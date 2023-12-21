

namespace Application.Foods
{
    public class FoodDto
    {   public Guid Id { get; set; }
        public string name { get; set; }
        public double calories { get; set; }
        public double proteins { get; set; }
        public double carbs { get; set; }
        public double fats { get; set; }
    }
}