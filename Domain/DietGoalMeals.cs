namespace Domain
{
    public class DietGoalMeals
    {
        public Guid GoalId  { get; set; }
        public DietGoal DietGoal  { get; set; }
        public Guid MealId  { get; set; }
        public Meal Meal  { get; set; }
        public double Quantity { get; set; }
    }
}