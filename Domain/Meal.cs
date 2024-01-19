namespace Domain
{
    public class Meal
    {
        public Guid Id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public float calories { get; set; }
        public float proteins { get; set; }
        public float carbs { get; set; }
        public float fats { get; set; }
        public ICollection<DietGoalMeals> DietGoals  { get; set; }
     
    }
}