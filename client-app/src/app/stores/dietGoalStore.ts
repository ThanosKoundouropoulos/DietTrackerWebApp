import { computed, makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { store } from "./store";
import { DietGoal, DietGoalFormValues } from "../models/dietGoal";
import { Macronutrients } from "../models/macros";
import { Food } from "../models/Food";
import { Meal } from "../models/meal";

export default class DietGoalStore{
   selectedDietGoal: DietGoal | undefined = undefined;
   remainingDietGoal: DietGoal | undefined = undefined;
   consumedCalories: number = 0;
   consumedProteins: number = 0;
   consumedCarbs: number = 0;
   consumedFats: number = 0;
   editMode = false;
   loading = false;
   loadingInitial = false;
   
    
    constructor(){
      makeAutoObservable(this, {
        totalNutrientsConsumed: computed,
      });
    }

    get totalNutrientsConsumed() {
      const foodStore = store.foodStore;
      const mealStore = store.mealStore;
  
      const totalNutrients = {
        calories: 0,
        proteins: 0,
        carbs: 0,
        fats: 0,
        caffeine: 0,
        sugars: 0,
        fiber: 0,
        calcium: 0,
        iron: 0,
        magnesium: 0,
        potassium: 0,
        sodium: 0,
        zinc: 0,
        retinol: 0,
        vitaminA: 0,
        betaCarotene: 0,
        vitaminD: 0,
        vitaminC: 0,
        folate: 0,
        vitaminB12: 0,
        vitaminK: 0,
        cholesterol: 0,
        saturatedFattyAcids: 0,
        monounsaturatedFattyAcids: 0,
        polyunsaturatedFattyAcids: 0,
        quantity: 0
      };
  
      const foodTotals = foodStore.foods.reduce((acc, food) => {
        acc.calories += food.calories ;
        acc.proteins += food.proteins ;
        acc.carbs += food.carbs ;
        acc.fats += food.fats ;
        acc.caffeine += food.caffeine ;
        acc.sugars += food.sugars ;
        acc.fiber += food.fiber ;
        acc.calcium += food.calcium ;
        acc.iron += food.iron ;
        acc.magnesium += food.magnesium ;
        acc.potassium += food.potassium ;
        acc.sodium += food.sodium ;
        acc.zinc += food.zinc ;
        acc.retinol += food.retinol ;
        acc.vitaminA += food.vitaminA ;
        acc.betaCarotene += food.betaCarotene ;
        acc.vitaminD += food.vitaminD ;
        acc.vitaminC += food.vitaminC ;
        acc.folate += food.folate ;
        acc.vitaminB12 += food.vitaminB12 ;
        acc.vitaminK += food.vitaminK ;
        acc.cholesterol += food.cholesterol ;
        acc.saturatedFattyAcids += food.saturatedFattyAcids ;
        acc.monounsaturatedFattyAcids += food.monounsaturatedFattyAcids ;
        acc.polyunsaturatedFattyAcids += food.polyunsaturatedFattyAcids ;
        return acc;
      }, { ...totalNutrients });
  
      const mealTotals = mealStore.mealEntries.reduce((acc, meal) => {
        acc.calories += meal.calories ;
        acc.proteins += meal.proteins ;
        acc.carbs += meal.carbs ;
        acc.fats += meal.fats ;
        acc.caffeine += meal.caffeine ;
        acc.sugars += meal.sugars ;
        acc.fiber += meal.fiber ;
        acc.calcium += meal.calcium ;
        acc.iron += meal.iron;
        acc.magnesium += meal.magnesium ;
        acc.potassium += meal.potassium ;
        acc.sodium += meal.sodium ;
        acc.zinc += meal.zinc;
        acc.retinol += meal.retinol ;
        acc.vitaminA += meal.vitaminA ;
        acc.betaCarotene += meal.betaCarotene ;
        acc.vitaminD += meal.vitaminD ;
        acc.vitaminC += meal.vitaminC ;
        acc.folate += meal.folate ;
        acc.vitaminB12 += meal.vitaminB12 ;
        acc.vitaminK += meal.vitaminK ;
        acc.cholesterol += meal.cholesterol;
        acc.saturatedFattyAcids += meal.saturatedFattyAcids ;
        acc.monounsaturatedFattyAcids += meal.monounsaturatedFattyAcids ;
        acc.polyunsaturatedFattyAcids += meal.polyunsaturatedFattyAcids ;
        return acc;
      }, { ...totalNutrients });
  
      return {
        ...foodTotals,
        ...mealTotals,
        calories: foodTotals.calories + mealTotals.calories,
        proteins: foodTotals.proteins + mealTotals.proteins,
        carbs: foodTotals.carbs + mealTotals.carbs,
        fats: foodTotals.fats + mealTotals.fats,
        caffeine: foodTotals.caffeine + mealTotals.caffeine,
        sugars: foodTotals.sugars + mealTotals.sugars,
        fiber: foodTotals.fiber + mealTotals.fiber,
        calcium: foodTotals.calcium + mealTotals.calcium,
        iron: foodTotals.iron + mealTotals.iron,
        magnesium: foodTotals.magnesium + mealTotals.magnesium,
        potassium: foodTotals.potassium + mealTotals.potassium,
        sodium: foodTotals.sodium + mealTotals.sodium,
        zinc: foodTotals.zinc + mealTotals.zinc,
        retinol: foodTotals.retinol + mealTotals.retinol,
        vitaminA: foodTotals.vitaminA + mealTotals.vitaminA,
        betaCarotene: foodTotals.betaCarotene + mealTotals.betaCarotene,
        vitaminD: foodTotals.vitaminD + mealTotals.vitaminD,
        vitaminC: foodTotals.vitaminC + mealTotals.vitaminC,
        folate: foodTotals.folate + mealTotals.folate,
        vitaminB12: foodTotals.vitaminB12 + mealTotals.vitaminB12,
        vitaminK: foodTotals.vitaminK + mealTotals.vitaminK,
        cholesterol: foodTotals.cholesterol + mealTotals.cholesterol,
        saturatedFattyAcids: foodTotals.saturatedFattyAcids + mealTotals.saturatedFattyAcids,
        monounsaturatedFattyAcids: foodTotals.monounsaturatedFattyAcids + mealTotals.monounsaturatedFattyAcids,
        polyunsaturatedFattyAcids: foodTotals.polyunsaturatedFattyAcids + mealTotals.polyunsaturatedFattyAcids,
        quantity: foodTotals.quantity + mealTotals.quantity
      };
    }
  
  

    private splitCaloriesToMacros(dailyCalorieIntake: number):Macronutrients{
        const carbsRatio = 0.40; // 40% of total calories
        const proteinRatio = 0.30; // 30% of total calories
        const fatRatio = 0.30; // 30% of total calories
      
        const carbsCalories = dailyCalorieIntake * carbsRatio;
        const proteinCalories = dailyCalorieIntake * proteinRatio;
        const fatCalories = dailyCalorieIntake * fatRatio;
      
        // (1 gram of carbs/protein = 4 calories, and 1 gram of fat = 9 calories)
        const carbsGrams = carbsCalories / 4;
        const proteinGrams = proteinCalories / 4;
        const fatGrams = fatCalories / 9;
      
        return {
          carbs: carbsGrams,
          protein: proteinGrams,
          fat: fatGrams,
        };
        
    }

    private calculateCalorieIntake(age: number, gender: string,weightKg: number,heightCm: number,activityLevel: number,plan: string){
      const heightM = heightCm / 100;

      // Calculate BMR using Mifflin-St Jeor equation
      let bmr: number;
      if (gender === "male") {
        bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
      } else {
        bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
      }
    
      // Calculate TDEE based on activity level
      const tdee = bmr * activityLevel;
    
      // Adjust for weight loss/gain goals
      let calorieIntake: number;
      if (plan === "lose") {
        calorieIntake = tdee - 500;
      } else {
        calorieIntake = tdee + 300;
      }
    
      return calorieIntake;
        
    }


    createGoal = async (dietGoal: DietGoalFormValues) => {
        const uStore = store.userStore;
        const dailyCalories = this.calculateCalorieIntake(Number(dietGoal.age), dietGoal.gender, Number(dietGoal.weight), Number(dietGoal.height), Number(dietGoal.activityLevel),dietGoal.plan);
        const macros = this.splitCaloriesToMacros(await dailyCalories);
       
        try {
          uStore.user!.hasDietPlan =true;
            const newGoal = new DietGoal(dietGoal)
            newGoal.calories =dailyCalories;
            newGoal.proteins =macros.protein;
            newGoal.carbs =macros.carbs;
            newGoal.fats =macros.fat;
            await agent.DietGoals.create(newGoal);   
            runInAction(() => {
                this.selectedDietGoal = newGoal; 
                this.remainingDietGoal = newGoal;
                uStore.user!.dietGoal = newGoal;
                uStore.dietGoal = newGoal;
            })
        } catch (error) {
            console.log(error);
        }
    }

    editDietGoal = async (dietGoal: DietGoalFormValues) => {
      const foodStore = store.foodStore;
      const mealStore = store.mealStore;
      const uStore = store.userStore;
  
      try {
        const dailyCalories = this.calculateCalorieIntake(
          Number(dietGoal.age),
          dietGoal.gender,
          Number(dietGoal.weight),
          Number(dietGoal.height),
          Number(dietGoal.activityLevel),
          dietGoal.plan
        );
        const macros = this.splitCaloriesToMacros(await dailyCalories);
  
        const newGoal = new DietGoal(dietGoal);
        newGoal.calories = dailyCalories;
        newGoal.proteins = macros.protein;
        newGoal.carbs = macros.carbs;
        newGoal.fats = macros.fat;

        for (const food of foodStore.foods) {
          await agent.DietGoals.deleteFoodEntry(uStore.dietGoal?.id!, food.id);
          runInAction(() => foodStore.removeFood(food.id));
        }

        for (const meal of mealStore.mealEntries) {
          await agent.DietGoals.deleteMealEntry(uStore.dietGoal?.id!, meal.id);
          runInAction(() => mealStore.removeMealEntry(meal.id));
        }
  
        runInAction(() => {
          uStore.updateGoal(newGoal);
          this.remainingDietGoal = newGoal;
        });
  
        await agent.DietGoals.update(newGoal);
      } catch (error) {
        console.log(error);
      }
    };
    deleteDietGoal = async (goalId: string) => {
        const uStore = store.userStore;
        const foodStore = store.foodStore;
        const mealStore = store.mealStore;
        try {
            runInAction(() => {
              foodStore.foods = [];
              mealStore.mealEntries = [];
              this.remainingDietGoal = undefined; 
              uStore.dietGoal = null;
            })
            await agent.DietGoals.delete(goalId);  
        } catch (error) {
            console.log(error);
        }
    }

    addFoodToDiet = async (selectedFood: Food,amount: number) => {
        const foodsStore = store.foodStore
        const convertedFood = {
          ...selectedFood,
          calories: (selectedFood.calories || 0) * amount,
          proteins: (selectedFood.proteins || 0) * amount,
          carbs: (selectedFood.carbs || 0) * amount,
          fats: (selectedFood.fats || 0) * amount,
          amountConsumed: amount,
        };
        try {
          const existingFood = foodsStore.foods.find((food) => food.id === selectedFood.id);
          if (!existingFood) {
            
            runInAction(() => {foodsStore.foods.push(convertedFood);});
            this.subtractFromDietGoal(convertedFood);
          }else{
              runInAction(() => {
                existingFood.calories = (existingFood.calories || 0) + (selectedFood.calories || 0) * amount;
                existingFood.proteins = (existingFood.proteins || 0) + (selectedFood.proteins || 0) * amount;
                existingFood.carbs = (existingFood.carbs || 0) + (selectedFood.carbs || 0) * amount;
                existingFood.fats = (existingFood.fats || 0) + (selectedFood.fats || 0) * amount;
                existingFood.amountConsumed = (existingFood.amountConsumed || 0) + amount;
              });
              this.subtractFromDietGoal(convertedFood);
          }
          
          await agent.Foods.add(selectedFood.id, amount);
          
        } catch (error) {
          console.error('Error adding food to diet:', error);
          throw error;
        }
      };

    addMealToDiet = async (selectedMeal: Meal) => {
      const mealStore = store.mealStore;
      
      try {
        const mealEntry = mealStore.mealEntries.find((meal) => meal.id === selectedMeal.id);
        if (!selectedMeal.quantity) {
          selectedMeal.quantity = 1;
        }
        await agent.Meals.add(selectedMeal.id);
        if (!mealEntry) {
          const newMealEntry = { ...selectedMeal }; 
          newMealEntry.quantity = 1; 
          runInAction(() => {
            mealStore.mealEntries.push(newMealEntry); 
          });
          this.subtractFromDietGoal(selectedMeal);
        } else {
          runInAction(() => {
            mealEntry.quantity += 1;
            mealEntry.calories += selectedMeal.calories;
            mealEntry.proteins += selectedMeal.proteins;
            mealEntry.carbs += selectedMeal.carbs;
            mealEntry.fats += selectedMeal.fats;
          });
          this.subtractFromDietGoal(selectedMeal);
        }
      } catch (error) {
        console.error('Error adding meal to diet:', error);
        throw error;
      }
    };
      
    deleteFoodEntry = async (goalId: string, foodId: string ) => {
      const foods = store.foodStore
      try {
        const foodToDelete = foods.foods.find((food) => food.id === foodId);
        console.log(` food to delete: ${foodToDelete?.name}, Calories: ${foodToDelete?.calories}`);
        await agent.DietGoals.deleteFoodEntry(goalId, foodId);
        runInAction(() => foods.removeFood(foodId));
        if (foodToDelete) {
          this.addBackToDietGoal(foodToDelete);
        }
        
      } catch (error) {
        console.error('Error deleting food entry:', error);
        throw error;
      }
    };

    deleteMealEntry = async (goalId: string, mealId: string ) => {
      const mealStore = store.mealStore
      try {
        const mealToDelete = mealStore.mealEntries.find((meal) => meal.id === mealId);
        await agent.DietGoals.deleteMealEntry(goalId, mealId);
        runInAction(() => mealStore.removeMealEntry(mealId));
        if (mealToDelete) {
          this.addBackToDietGoal(mealToDelete);
        }
        
      } catch (error) {
        console.error('Error deleting meal entry:', error);
        throw error;
      }
    };

    clearDietGoal = async (goalId: string) => {
      
      const foodStore = store.foodStore;
      const mealStore = store.mealStore;
      try {
        runInAction(() =>  this.loading = true);
        for (const food of foodStore.foods) {
          await agent.DietGoals.deleteFoodEntry(goalId, food.id);
          runInAction(() => foodStore.removeFood(food.id));
          this.addBackToDietGoal(food);
          runInAction(() =>  this.loading = false);
        }

        for (const meal of mealStore.mealEntries) {
          await agent.DietGoals.deleteMealEntry(goalId, meal.id);
          runInAction(() => mealStore.removeMealEntry(meal.id));
          this.addBackToDietGoal(meal);
          runInAction(() =>  this.loading = false);
        }
        
      } catch (error) {
        console.error('Error clearing diet goal:', error);
        runInAction(() =>  this.loading = false);
        throw error;
      }
    };

    loadDietGoal = async () => {
        const user = store.userStore.user;
        let dietGoal = this.selectedDietGoal;
        if (user!.dietGoal) {
            this.selectedDietGoal = user?.dietGoal;
        }
        else{
            this.setLoadingInitial(true);
            try {
                dietGoal = await agent.DietGoals.details(user!.dietGoal!.id);
                runInAction(() => this.selectedDietGoal = dietGoal);
                this.setLoadingInitial(false);
                return dietGoal;
            } catch (error){
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
        
    }
    addBackToDietGoal = async (foodToDelete: Food | Meal) => {
      this.remainingDietGoal!.calories += foodToDelete.calories;
      this.remainingDietGoal!.proteins += foodToDelete.proteins;
      this.remainingDietGoal!.carbs += foodToDelete.carbs;
      this.remainingDietGoal!.fats += foodToDelete.fats;
      this.consumedCalories -= foodToDelete.calories;
      this.consumedProteins -= foodToDelete.proteins;
      this.consumedCarbs -= foodToDelete.carbs;
      this.consumedFats -= foodToDelete.fats;
    }

    subtractFromDietGoal = async (foodToAdd: Food | Meal) => {
      this.remainingDietGoal!.calories -= foodToAdd.calories;
      this.remainingDietGoal!.proteins -= foodToAdd.proteins;
      this.remainingDietGoal!.carbs -= foodToAdd.carbs;
      this.remainingDietGoal!.fats -= foodToAdd.fats;
      this.consumedCalories+= foodToAdd.calories;
      this.consumedProteins += foodToAdd.proteins;
      this.consumedCarbs += foodToAdd.carbs;
      this.consumedFats+= foodToAdd.fats;
    }

    loadRemainingDietGoal = async (dietGoal: DietGoal) => {
        this.remainingDietGoal = dietGoal;  
    }

    

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

   
}