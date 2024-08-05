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