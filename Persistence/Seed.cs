using System.Text.Json;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
      public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.DietGoals.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser { DisplayName = "Bob", UserName = "bob", Email = "bob@test.com", weight = 0, height = 0, activityLevel = 0, gender = "", age = 0, hasDietPlan = false },
                    new AppUser { DisplayName = "Jane", UserName = "jane", Email = "jane@test.com", weight = 0, height = 0, activityLevel = 0, gender = "", age = 0, hasDietPlan = false },
                    new AppUser { DisplayName = "Tom", UserName = "tom", Email = "tom@test.com", weight = 0, height = 0, activityLevel = 0, gender = "", age = 0, hasDietPlan = false }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var dietGoals = new List<DietGoal>
                {
                    new DietGoal { calories = 0, proteins = 0, carbs = 0, fats = 0 },
                    new DietGoal { calories = 0, proteins = 0, carbs = 0, fats = 0 },
                    new DietGoal { calories = 0, proteins = 0, carbs = 0, fats = 0 }
                };

                await context.DietGoals.AddRangeAsync(dietGoals);

                var surveyFoods = await ReadSurveyFoodsFromJsonFileAsync("C:/Users/thano/Desktop/testFoods.json");
                var brandedFoods = await ReadBrandedFoodsFromJsonFileAsync("C:/Users/thano/Desktop/testBrandFoods.json");

                await context.Foods.AddRangeAsync(surveyFoods);
                await context.Foods.AddRangeAsync(brandedFoods);
                await context.SaveChangesAsync();
            }
        }

        private static async Task<List<Food>> ReadSurveyFoodsFromJsonFileAsync(string filePath)
        {
            var json = await File.ReadAllTextAsync(filePath);
            var surveyFoodWrapper = JsonSerializer.Deserialize<SurveyFoodWrapper>(json);

            if (surveyFoodWrapper != null && surveyFoodWrapper.SurveyFoods != null)
            {
                return surveyFoodWrapper.SurveyFoods.Select(Food.FromJson).ToList();
            }

            return new List<Food>();
        }

        private static async Task<List<Food>> ReadBrandedFoodsFromJsonFileAsync(string filePath)
        {
            var json = await File.ReadAllTextAsync(filePath);
            var brandedFoodWrapper = JsonSerializer.Deserialize<BrandedFoodWrapper>(json);

            if (brandedFoodWrapper != null && brandedFoodWrapper.BrandedFoods != null)
            {
                return brandedFoodWrapper.BrandedFoods.Select(Food.FromJson).ToList();
            }

            return new List<Food>();
        }
    }

}