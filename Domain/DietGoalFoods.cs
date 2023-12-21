namespace Domain
{
    public class DietGoalFoods
    {
        public Guid GoalId  { get; set; }
        public DietGoal DietGoal  { get; set; }
        public Guid FoodId  { get; set; }
        public Food Food  { get; set; }
        public double amountConsumed { get; set; }
    }
}