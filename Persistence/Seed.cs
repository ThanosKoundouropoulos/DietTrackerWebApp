using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
           UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.DietGoals.Any())
            {
                var users = new List<AppUser>
                {
                   
                        new AppUser
                        {
                           
                            DisplayName = "Bob",
                            UserName = "bob",
                            Email = "bob@test.com",
                            weight = 0,
                            height = 0,
                            activityLevel = 0,
                            gender = "",
                            age = 0,
                            hasDietPlan = false
                        },
                        new AppUser
                        {
                            DisplayName = "Jane",
                            UserName = "jane",
                            Email = "jane@test.com",
                            weight = 0,
                            height = 0,
                            activityLevel = 0,
                            gender = "",
                            age = 0,
                            hasDietPlan = false
                        },
                        new AppUser
                        {
                            DisplayName = "Tom",
                            UserName = "tom",
                            Email = "tom@test.com",
                            weight = 0,
                            height = 0,
                            activityLevel = 0,
                            gender = "",
                            age = 0,
                            hasDietPlan = false
                        }
                    
                    };

                    foreach (var user in users)
                    {
                        await userManager.CreateAsync(user, "Pa$$w0rd");
                       
                    }

                    var dietGoals = new List<DietGoal>
                    {
                        new DietGoal
                        {
                            calories = 0,
                            proteins = 0,
                            carbs = 0,
                            fats = 0
                        },
                        new DietGoal
                        {
                            calories = 0,
                            proteins = 0,
                            carbs = 0,
                            fats = 0
                        },
                        new DietGoal
                        {
                            calories = 0,
                            proteins = 0,
                            carbs = 0,
                            fats = 0
                        }
                    };


                      var foods = new List<Food>
                    {
                        new Food
                        {
                            name = "Boiled Potato",
                            calories = 103,
                            proteins = 1.81,
                            carbs = 19.52,
                            fats = 2.24
                        },
                        new Food
                        {
                            name = "Baked Potato",
                            calories = 109,
                            proteins = 2.43,
                            carbs = 20.53,
                            fats = 2.29
                        },
                        new Food
                        {
                            name = "Potato French Fries",
                            calories = 274,
                            proteins = 3.48,
                            carbs = 35.66,
                            fats = 14.06
                        },
                        new Food
                        {
                            name = "Chicken Breast Meat (Roasted, Cooked)",
                            calories = 165,
                            proteins = 31.02,
                            carbs = 0,
                            fats = 3.57
                        },
                        new Food
                        {
                            name = "Peanut Butter",
                            calories = 588,
                            proteins = 25.09,
                            carbs = 19.56,
                            fats = 50.39
                        }
                    };
                    
                await context.DietGoals.AddRangeAsync(dietGoals);
                await context.Foods.AddRangeAsync(foods);
                await context.SaveChangesAsync();
            }
          


        }
    }
}