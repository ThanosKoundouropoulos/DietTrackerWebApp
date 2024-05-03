import { makeAutoObservable, runInAction } from "mobx";

import agent from "../api/agent";




import { store } from "./store";
import { DietGoal, DietGoalFormValues } from "../models/dietGoal";
import { Macronutrients } from "../models/macros";
import { router } from "../router/Routes";
import { useNavigate } from "react-router-dom";
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
        makeAutoObservable(this)
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
        const user = store.userStore.user;
        const dailyCalories = this.calculateCalorieIntake(Number(dietGoal.age), dietGoal.gender, Number(dietGoal.weight), Number(dietGoal.height), Number(dietGoal.activityLevel),dietGoal.plan);
        const macros = this.splitCaloriesToMacros(await dailyCalories);
       
        try {
            user!.hasDietPlan =true;
            const newGoal = new DietGoal(dietGoal)
            newGoal.calories =dailyCalories;
            newGoal.proteins =macros.protein;
            newGoal.carbs =macros.carbs;
            newGoal.fats =macros.fat;
            console.log("NEW GOAL :" ,newGoal);
            await agent.DietGoals.create(newGoal);   
            runInAction(() => {
                this.selectedDietGoal = newGoal; 
            })
        } catch (error) {
            console.log(error);
        }
    }

    editDietGoal = async (dietGoal: DietGoalFormValues) => {
        const uStore = store.userStore;
        const dailyCalories = this.calculateCalorieIntake(Number(dietGoal.age), dietGoal.gender, Number(dietGoal.weight), Number(dietGoal.height), Number(dietGoal.activityLevel),dietGoal.plan);
        const macros = this.splitCaloriesToMacros(await dailyCalories);
       
        try {
            const newGoal = new DietGoal(dietGoal)
            newGoal.calories =dailyCalories;
            newGoal.proteins =macros.protein;
            newGoal.carbs =macros.carbs;
            newGoal.fats =macros.fat;
            console.log("NEW GOAL :" ,newGoal);
            
            await agent.DietGoals.update(newGoal);   
            runInAction(() => {
              uStore.updateGoal(newGoal);
              this.remainingDietGoal = newGoal; 
            })
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
          console.log(`Added food to diet: ${selectedFood.name}, Amount: ${amount}`);
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
      const mealStore = store.mealStore
      if (!selectedMeal.quantity) {
        selectedMeal.quantity =1;
      }
      
      try {
        
        const meal = mealStore.mealEntries.find((meal) => meal.id === selectedMeal.id);
        await agent.Meals.add(selectedMeal.id);
        if (!meal) {
          console.log(`Added meal to diet: ${selectedMeal.name} , with qunatity :  ${selectedMeal.quantity}`);
          runInAction(() => {mealStore.mealEntries.push(selectedMeal);});
          this.subtractFromDietGoal(selectedMeal);
        }else{
            console.log(`Added meal to diet 2: ${selectedMeal.name} , with qunatity :  ${meal.quantity}`);
            runInAction(() => {
              meal.calories = (selectedMeal.calories || 0) * (meal.quantity || 0) ;
              meal.proteins = (selectedMeal.proteins || 0) * (meal.quantity || 0);
              meal.carbs = (selectedMeal.carbs || 0) * (meal.quantity || 0) ;
              meal.fats = (selectedMeal.fats || 0) * (meal.quantity || 0);
              meal.quantity +=1;
            });
            this.subtractFromDietGoal(meal);
        }    
        console.log(`meals: ${mealStore.mealEntries.length}`);
        
      } catch (error) {
        console.error('Error adding food to diet:', error);
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
        console.log(` meal entry to delete: ${mealToDelete?.name}, Calories: ${mealToDelete?.calories}`);
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
        console.log("LOAD GOAL 2 :" ,dietGoal );
        if (user!.dietGoal) {
            this.selectedDietGoal = user?.dietGoal;
        }
        else{
            this.setLoadingInitial(true);
            try {
                dietGoal = await agent.DietGoals.details(user!.dietGoal!.id);
                console.log("LOAD GOAL 3 :" ,dietGoal );
                runInAction(() => this.selectedDietGoal = dietGoal);
                console.log("LOAD GOAL 4 ID:" ,this.selectedDietGoal?.id );
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