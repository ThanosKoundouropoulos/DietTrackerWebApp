

namespace Application.Meals
{
    public class ConsumedMealDto
    {   public Guid Id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public double calories { get; set; }
        public double proteins { get; set; }
        public double carbs { get; set; }
        public double fats { get; set; }
        public double quantity { get; set; }
    }
}