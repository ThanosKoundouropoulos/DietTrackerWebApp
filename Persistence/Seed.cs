using System.Text.Json;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;


namespace Persistence
{
    public class Seed
    {
        private const int BatchSize = 1000;

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

                
                var brandedFoodFiles = new[]
                {
                    "C:/Users/thano/Desktop/output_1.json",
                    "C:/Users/thano/Desktop/output_2.json",
                    "C:/Users/thano/Desktop/output_3.json",
                    "C:/Users/thano/Desktop/output_4.json",
                    "C:/Users/thano/Desktop/output_5.json",
                    "C:/Users/thano/Desktop/output_6.json",
                    "C:/Users/thano/Desktop/output_7.json"
                };

                
                await InsertFoodsInBatches(context, 
                    "C:/Users/thano/Desktop/FoodData_Central_survey_food_json_2022-10-28.json", 
                    brandedFoodFiles);

                await context.Database.ExecuteSqlRawAsync("VACUUM");
                await context.SaveChangesAsync();
            }
        }

        private static async Task InsertFoodsInBatches(DataContext context, string surveyFoodFilePath, string[] brandedFoodFiles)
        {
            var foods = new List<Food>();
            await foreach (var food in ReadSurveyFoodsFromJsonStreamAsync(surveyFoodFilePath))
            {
                foods.Add(food);
                if (foods.Count >= BatchSize)
                {
                    await SaveBatchAsync(context, foods);
                    foods.Clear();
                }
            }
            foreach (var filePath in brandedFoodFiles)
            {
                await foreach (var food in ReadBrandedFoodsFromJsonStreamAsync(filePath))
                {
                    foods.Add(food);
                    if (foods.Count >= BatchSize)
                    {
                        await SaveBatchAsync(context, foods);
                        foods.Clear();
                    }
                }
            }
            if (foods.Any())
            {
                await SaveBatchAsync(context, foods);
            }
        }

        private static async Task SaveBatchAsync(DataContext context, List<Food> foods)
        {
            using (var transaction = await context.Database.BeginTransactionAsync())
            {
                try
                {
                    await context.Foods.AddRangeAsync(foods);
                    await context.SaveChangesAsync();
                    await transaction.CommitAsync();
                }
                catch (Exception ex)
                {
        
                    Console.WriteLine($"Error saving batch: {ex.Message}");
                    await transaction.RollbackAsync();
                    throw; 
                }
            }
        }

        private static async IAsyncEnumerable<Food> ReadSurveyFoodsFromJsonStreamAsync(string filePath)
        {
            await using var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.Read, bufferSize: 8192, useAsync: true);
            
            var jsonDoc = await JsonDocument.ParseAsync(stream);
            
            var foodsArray = jsonDoc.RootElement.GetProperty("SurveyFoods");
            
            foreach (var foodElement in foodsArray.EnumerateArray())
            {
                var foodData = System.Text.Json.JsonSerializer.Deserialize<FoodData>(foodElement.GetRawText());
                if (foodData != null)
                {
                    yield return Food.FromJson(foodData);
                }
            }
        }

        private static async IAsyncEnumerable<Food> ReadBrandedFoodsFromJsonStreamAsync(string filePath)
        {
            await using var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.Read, bufferSize: 8192, useAsync: true);

            var jsonDoc = await JsonDocument.ParseAsync(stream);

            var foodsArray = jsonDoc.RootElement.GetProperty("BrandedFoods");

            foreach (var foodElement in foodsArray.EnumerateArray())
            {
                var foodData = System.Text.Json.JsonSerializer.Deserialize<FoodData>(foodElement.GetRawText());
                if (foodData != null)
                {
                    yield return Food.FromJson(foodData);
                }
            }
        }
    }

}