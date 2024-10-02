using System.Text;
using System.Text.Json;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class Seed
    {
        private const int BatchSize = 5;

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

                await InsertFoodsInBatches(context, "C:/Users/thano/Desktop/FoodData_Central_survey_food_json_2022-10-28.json", 
                                                    "C:/Users/thano/Desktop/brandedDownload2.json");
                await context.Database.ExecuteSqlRawAsync("VACUUM");
                await context.SaveChangesAsync();
            }
        }

        private static async Task InsertFoodsInBatches(DataContext context, params string[] filePaths)
        {
            var foods = new List<Food>();

            foreach (var filePath in filePaths)
            {
                if (filePath.Contains("FoodData_Central_survey_food_json_2022-10-28.json"))
                {
                    await foreach (var food in ReadSurveyFoodsFromJsonStreamAsync(filePath))
                    {
                        foods.Add(food);
                        if (foods.Count >= BatchSize)
                        {
                            await SaveBatchAsync(context, foods);
                            foods.Clear();
                        }
                    }
                }
                else if (filePath.Contains("brandedDownload2.json"))
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
                    // Log the exception message for debugging
                    Console.WriteLine($"Error saving batch: {ex.Message}");
                    await transaction.RollbackAsync();
                    throw; // Rethrow to notify higher-level logic of the failure
                }
            }
        }

        private static async IAsyncEnumerable<Food> ReadSurveyFoodsFromJsonStreamAsync(string filePath)
        {
            await using var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.Read, bufferSize: 8192, useAsync: true);
            
            // Read the entire JSON file in one go into a JsonDocument
            var jsonDoc = await JsonDocument.ParseAsync(stream);
            
            var foodsArray = jsonDoc.RootElement.GetProperty("SurveyFoods");
            
            foreach (var foodElement in foodsArray.EnumerateArray())
            {
                var foodData = JsonSerializer.Deserialize<FoodData>(foodElement.GetRawText());
                if (foodData != null)
                {
                    yield return Food.FromJson(foodData);
                }
            }
        }

private static async IAsyncEnumerable<Food> ReadBrandedFoodsFromJsonStreamAsync(string filePath)
{
    await using var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.Read, bufferSize: 8192, useAsync: true);
    
    // Read the entire JSON file in one go into a JsonDocument
    var jsonDoc = await JsonDocument.ParseAsync(stream);
    
    var foodsArray = jsonDoc.RootElement.GetProperty("BrandedFoods");
    
    foreach (var foodElement in foodsArray.EnumerateArray())
    {
        var foodData = JsonSerializer.Deserialize<FoodData>(foodElement.GetRawText());
        if (foodData != null)
        {
            yield return Food.FromJson(foodData);
        }
    }
}
       
    }

}