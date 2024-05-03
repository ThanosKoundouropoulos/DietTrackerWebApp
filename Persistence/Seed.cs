using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
        UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any()            && !context.DietGoals.Any())
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
                        new Food { name = "Boiled Potato", calories = 103, proteins = 1.81, carbs = 19.52, fats = 2.24 },
                        new Food { name = "Baked Potato", calories = 109, proteins = 2.43, carbs = 20.53, fats = 2.29 },
                        new Food { name = "Potato French Fries", calories = 274, proteins = 3.48, carbs = 35.66, fats = 14.06 },
                        new Food { name = "Chicken Breast (Roasted, Cooked)", calories = 165, proteins = 31.02, carbs = 0, fats = 3.57 },
                        new Food { name = "Peanut Butter", calories = 588, proteins = 25.09, carbs = 19.56, fats = 50.39 },
                        new Food { name = "Salmon (Grilled)", calories = 206, proteins = 22, carbs = 0, fats = 13 },
                        new Food { name = "Brown Rice (Cooked)", calories = 215, proteins = 5, carbs = 45, fats = 1.6 },
                        new Food { name = "Spinach (Raw)", calories = 23, proteins = 2.9, carbs = 3.6, fats = 0.4 },
                        new Food { name = "Blueberries", calories = 57, proteins = 0.7, carbs = 14.5, fats = 0.3 },
                        new Food { name = "Greek Yogurt", calories = 59, proteins = 10, carbs = 3.6, fats = 0.4 },
                        new Food { name = "Quinoa (Cooked)", calories = 120, proteins = 4, carbs = 21, fats = 2 },
                        new Food { name = "Avocado", calories = 160, proteins = 2, carbs = 8.5, fats = 14.7 },
                        new Food { name = "Almonds", calories = 7, proteins = 21, carbs = 22, fats = 50 },
                        new Food { name = "Oats", calories = 68, proteins = 13, carbs = 11, fats = 1.4 },
                        new Food { name = "Egg (Boiled)", calories = 68, proteins = 6, carbs = 0.6, fats = 4.8 },
                        new Food { name = "Banana", calories = 105, proteins = 1.3, carbs = 27, fats = 0.3 },
                        new Food { name = "Broccoli (Steamed)", calories = 55, proteins = 3.7, carbs = 11, fats = 0.6 },
                        new Food { name = "Cottage Cheese", calories = 206, proteins = 28, carbs = 3.4, fats = 9 },
                        new Food { name = "Tomato (Raw)", calories = 22, proteins = 1, carbs = 5, fats = 0.2 },
                        new Food { name = "Sweet Potato (Baked)", calories = 112, proteins = 2, carbs = 26, fats = 0.2 },
                        new Food { name = "Whole Wheat Bread", calories = 69, proteins = 3.6, carbs = 12.6, fats = 0.9 },
                        new Food { name = "Lentils (Cooked)", calories = 116, proteins = 9, carbs = 20, fats = 0.4 },
                        new Food { name = "Carrot (Raw)", calories = 41, proteins = 0.9, carbs = 10, fats = 0.2 },
                        new Food { name = "Orange", calories = 52, proteins = 1, carbs = 12, fats = 0.2 },
                        new Food { name = "Turkey Breast (Roasted)", calories = 135, proteins = 30, carbs = 0, fats = 1 },
                        new Food { name = "Black Beans (Cooked)", calories = 114, proteins = 7.6, carbs = 20.4, fats = 0.5 },
                        new Food { name = "Bell Pepper (Raw)", calories = 31, proteins = 1.3, carbs = 6, fats = 0.3 },
                        new Food { name = "Cucumber (Raw)", calories = 45, proteins = 2, carbs = 11, fats = 0.5 },
                        new Food { name = "Chia Seeds", calories = 138, proteins = 4.7, carbs = 12, fats = 9 },
                        new Food { name = "Yogurt (Low-fat)", calories = 59, proteins = 10, carbs = 3.6, fats = 0.4 },
                        new Food { name = "Hummus", calories = 166, proteins = 8, carbs = 15, fats = 9 },
                        new Food { name = "Grapes", calories = 69, proteins = 0.6, carbs = 18, fats = 0.2 },
                        new Food { name = "Pineapple", calories = 50, proteins = 0.5, carbs = 13, fats = 0.1 },
                        new Food { name = "Cauliflower (Steamed)", calories = 23, proteins = 1.9, carbs = 5, fats = 0.3 },
                        new Food { name = "Peach", calories = 39, proteins = 0.9, carbs = 10, fats = 0.2 },
                        new Food { name = "Shrimp (Grilled)", calories = 99, proteins = 24, carbs = 0, fats = 1.7 },
                        new Food { name = "Kiwi", calories = 61, proteins = 1.1, carbs = 15, fats = 0.5 },
                        new Food { name = "Mango", calories = 60, proteins = 0.8, carbs = 15, fats = 0.4 },
                        new Food { name = "Walnuts", calories = 654, proteins = 15, carbs = 14, fats = 65 },
                        new Food { name = "Salad (Mixed Greens)", calories = 5, proteins = 0.5, carbs = 1, fats = 0.1 },
                        new Food { name = "Cabbage (Raw)", calories = 25, proteins = 1.3, carbs = 6, fats = 0.1 },
                        new Food { name = "Cantaloupe", calories = 34, proteins = 0.8, carbs = 8, fats = 0.2 },
                        new Food { name = "Cheese (Cheddar)", calories = 402, proteins = 25, carbs = 1.3, fats = 33 },
                        new Food { name = "Apricot", calories = 17, proteins = 0.5, carbs = 4, fats = 0.1 },
                        new Food { name = "Pumpkin Seeds", calories = 559, proteins = 30, carbs = 54, fats = 49 },
                        new Food { name = "Green Beans (Steamed)", calories = 31, proteins = 1.8, carbs = 7, fats = 0.2 },
                        new Food { name = "Papaya", calories = 43, proteins = 0.5, carbs = 11, fats = 0.2 },
                        new Food { name = "Beef (Grilled)", calories = 250, proteins = 26, carbs = 0, fats = 17 },
                        new Food { name = "Raspberries", calories = 52, proteins = 1.2, carbs = 11.9, fats = 0.7 },
                        new Food { name = "Artichoke (Cooked)", calories = 47, proteins = 3.3, carbs = 10, fats = 0.2 },
                        new Food { name = "Asparagus (Steamed)", calories = 20, proteins = 2.2, carbs = 3.7, fats = 0.2 },
                        new Food { name = "Cranberries", calories = 46, proteins = 0.4, carbs = 12, fats = 0.1 },
                        new Food { name = "Strawberries", calories = 32, proteins = 0.7, carbs = 7.7, fats = 0.3 },
                        new Food { name = "Tofu (Firm, Cooked)", calories = 144, proteins = 15, carbs = 3.9, fats = 8 },
                    };

                    
                await context.DietGoals.AddRangeAsync(dietGoals);
                await context.Foods.AddRangeAsync(foods);
                await context.SaveChangesAsync();
            }
          


        }
    }
}