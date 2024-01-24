import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Meal, MealFormValues } from "../models/meal";
import { mean } from "lodash";
import { store } from "./store";



export default class MealStore{
    meals: Meal[] = [];
    mealEntries: Meal[] = [];
    isCreating = false;
    loading = false;
    loadingInitial = false;
  
    constructor() {
      makeAutoObservable(this);
    }

    createMeal = async (meal: MealFormValues) => {
      try {
  
          const newMeal = new Meal(meal)
          newMeal.calories =Number(meal.calories);
          newMeal.proteins =Number(meal.proteins);
          newMeal.carbs =Number(meal.carbs);
          newMeal.fats =Number(meal.fats);
          newMeal.quantity =1;
          console.log("NEW Meal info  :" ,newMeal.description,newMeal.calories,newMeal.proteins,newMeal.carbs,newMeal.fats);
          await agent.Meals.create(meal);  
          runInAction(() =>this.meals.push(newMeal));  
        
      } catch (error) {
          console.log(error);
      }
  }

  deleteMeal = async ( mealId: string ) => {
    try {
      const mealToDelete = this.meals.find((meal) => meal.id === mealId);
      console.log(` meal to delete: ${mealToDelete?.name}, Calories: ${mealToDelete?.calories}`);
      await agent.Meals.delete(mealId);
      runInAction(() =>{
        this.removeMeal(mealId);
        this.removeMealEntry(mealId);}
      ); 
    } catch (error) {
      console.error('Error deleting food entry:', error);
      throw error;
    }
  };

  loadMeals = async () => {
    
    try {
      const meals = await agent.Meals.list(); 
      runInAction(() => {
        this.meals = meals.map((meal) => ({
          ...meal
        }));
      });
    } catch (error) {
      console.error(error);
    }
  };

  loadMealEntries = async (goalId: string ) => {
    try {
      const meals = await agent.Meals.listEntries(goalId); 
      runInAction(() => {
        this.mealEntries = meals.map((meal) => ({
          ...meal,
          calories: meal.calories * meal.quantity,
          proteins: meal.proteins * meal.quantity,
          carbs: meal.carbs * meal.quantity,
          fats: meal.fats * meal.quantity,
          quantity: meal.quantity
        }));
        this.subtractMealFromGoal();
      });
    } catch (error) {
      console.error(error);
    }
  };

  subtractMealFromGoal = () => {
    const dietGoalStore = store.dietGoalStore;
    const totalCalories = this.mealEntries.reduce((sum, meal) => sum + (meal.calories || 0), 0);
    const totalProteins = this.mealEntries.reduce((sum, meal) => sum + (meal.proteins || 0), 0);
    const totalCarbs = this.mealEntries.reduce((sum, meal) => sum + (meal.carbs || 0), 0);
    const totalFats = this.mealEntries.reduce((sum, meal) => sum + (meal.fats || 0), 0);

    if (dietGoalStore.remainingDietGoal) {
      dietGoalStore.remainingDietGoal.calories -= totalCalories;
      dietGoalStore.remainingDietGoal.proteins -= totalProteins;
      dietGoalStore.remainingDietGoal.carbs -= totalCarbs;
      dietGoalStore.remainingDietGoal.fats -= totalFats;
      dietGoalStore.consumedCalories += totalCalories;
      dietGoalStore.consumedProteins+= totalProteins;
      dietGoalStore.consumedCarbs += totalCarbs;
      dietGoalStore.consumedFats+= totalFats;
    }
    
  };

    removeMealEntry = (mealId: string) => {
      this.mealEntries = this.mealEntries.filter((meal) => meal.id !== mealId);
    };
    removeMeal = (mealId: string) => {
      this.meals = this.meals.filter((meal) => meal.id !== mealId);
    };
  
    setCreating = (state: boolean) => {
        this.isCreating = state;
    }

}