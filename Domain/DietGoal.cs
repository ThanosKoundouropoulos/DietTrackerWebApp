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
        public AppUser AppUser { get; set; }
    }
}