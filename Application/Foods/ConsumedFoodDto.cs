namespace Application.Foods
{
    public class ConsumedFoodDto
    {
        public Guid Id { get; set; }
        public string name { get; set; }
        public double calories { get; set; }
        public double proteins { get; set; }
        public double carbs { get; set; }
        public double fats { get; set; }
        public double amountConsumed { get; set; }
    }
}