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
        public int quantity { get; set; }
        public Guid? DietGoalId { get; set; }
        public DietGoal DietGoal { get; set; }
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; } 

            // New macronutrient fields
        public double Caffeine { get; set; }
        public double Sugars { get; set; }
        public double Fiber { get; set; }
        public double Calcium { get; set; }
        public double Iron { get; set; }
        public double Magnesium { get; set; }
        public double Potassium { get; set; }
        public double Sodium { get; set; }
        public double Zinc { get; set; }
        public double Retinol { get; set; }
        public double VitaminA { get; set; }
        public double BetaCarotene { get; set; }
        public double VitaminD { get; set; }
        public double VitaminC { get; set; }
        public double Folate { get; set; }
        public double VitaminB12 { get; set; }
        public double VitaminK { get; set; }
        public double Cholesterol { get; set; }
        public double SaturatedFattyAcids { get; set; }
        public double MonounsaturatedFattyAcids { get; set; }
        public double PolyunsaturatedFattyAcids { get; set; }
     
    }
}