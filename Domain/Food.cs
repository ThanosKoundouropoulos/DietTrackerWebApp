using System.Text.Json.Serialization;

namespace Domain
{
    public class Food
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public double Calories { get; set; }
        public double Proteins { get; set; }
        public double Carbs { get; set; }
        public double Fats { get; set; }
        public ICollection<DietGoalFoods> DietGoals  { get; set; }

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

     
        public static Food FromJson(FoodData foodData)
        {
            return new Food
            {
                Id = Guid.NewGuid(),
                Name = foodData.Description,
                Calories = foodData.GetNutrientAmount(1008),  // Energy
                Proteins = foodData.GetNutrientAmount(1003),  // Protein
                Carbs = foodData.GetNutrientAmount(1005),     // Carbohydrate
                Fats = foodData.GetNutrientAmount(1004),      // Total lipid (fat)
                Caffeine = foodData.GetNutrientAmount(1057),
                Sugars = foodData.GetNutrientAmount(2000),
                Fiber = foodData.GetNutrientAmount(1079),
                Calcium = foodData.GetNutrientAmount(1087),
                Iron = foodData.GetNutrientAmount(1089),
                Magnesium = foodData.GetNutrientAmount(1090),
                Potassium = foodData.GetNutrientAmount(1092),
                Sodium = foodData.GetNutrientAmount(1093),
                Zinc = foodData.GetNutrientAmount(1095),
                Retinol = foodData.GetNutrientAmount(1105),
                VitaminA = foodData.GetNutrientAmount(1106),
                BetaCarotene = foodData.GetNutrientAmount(1107),
                VitaminD = foodData.GetNutrientAmount(1114),
                VitaminC = foodData.GetNutrientAmount(1162),
                Folate = foodData.GetNutrientAmount(1177),
                VitaminB12 = foodData.GetNutrientAmount(1178),
                VitaminK = foodData.GetNutrientAmount(1185),
                Cholesterol = foodData.GetNutrientAmount(1253),
                SaturatedFattyAcids = foodData.GetNutrientAmount(1258),
                MonounsaturatedFattyAcids = foodData.GetNutrientAmount(1292),
                PolyunsaturatedFattyAcids = foodData.GetNutrientAmount(1293),
                DietGoals = new List<DietGoalFoods>()
            };
        }
    }
}

 public class FoodData
    {
        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("foodNutrients")]
        public List<FoodNutrient> FoodNutrients { get; set; }

        public double GetNutrientAmount(int nutrientId)
        {
            var nutrient = FoodNutrients.Find(n => n.Nutrient.Id == nutrientId);
            return nutrient?.Amount ?? 0.0;
        }
    }

    public class FoodNutrient
    {
        [JsonPropertyName("nutrient")]
        public Nutrient Nutrient { get; set; }

        [JsonPropertyName("amount")]
        public double Amount { get; set; }
    }

    public class Nutrient
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("number")]
        public string Number { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("rank")]
        public int Rank { get; set; }

        [JsonPropertyName("unitName")]
        public string UnitName { get; set; }
    }

    public class FoodWrapper
    {
        [JsonPropertyName("foods")]
        public List<FoodData> Foods { get; set; }
    }
