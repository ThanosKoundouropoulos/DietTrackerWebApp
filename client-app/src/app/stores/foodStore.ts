import { makeAutoObservable, runInAction } from "mobx";

import agent from "../api/agent";




import { store } from "./store";
import { DietGoal, DietGoalFormValues } from "../models/dietGoal";
import { Macronutrients } from "../models/macros";
import { Food } from "../models/Food";



export default class FoodStore{
    foods: Food[] = [];
    searchResults: Food[] = [];
    loading = false;
    loadingInitial = false;
  
    constructor() {
      makeAutoObservable(this);
    }
  
    get hasFoods() {
      return this.foods.length > 0;
    }
  
    loadFoods = async () => {
      this.loadingInitial = true;
      try {
        const foods = await agent.Foods.list(); 
        runInAction(() => {
          this.foods = foods.map((food) => ({
            ...food,
            calories: food.calories * (food.amountConsumed || 1),
            proteins: food.proteins * (food.amountConsumed || 1),
            carbs: food.carbs * (food.amountConsumed || 1),
            fats: food.fats * (food.amountConsumed || 1),
          }));
          this.loadingInitial = false;
          this.subtractFromGoal();
        });
      } catch (error) {
        console.error(error);
        runInAction(() => {
          this.loadingInitial = false;
        });
      }
    };

    searchFoods = async (searchTerm: string) => {
      try {
        const response = await agent.Foods.search(searchTerm);
        runInAction(() => {
          
          this.searchResults = response;
        });
      } catch (error) {
        console.error('Error searching foods:', error);
      }
    };

    subtractFromGoal = () => {
      const dietGoalStore = store.dietGoalStore;
      const totalCalories = this.foods.reduce((sum, food) => sum + (food.calories || 0), 0);
      const totalProteins = this.foods.reduce((sum, food) => sum + (food.proteins || 0), 0);
      const totalCarbs = this.foods.reduce((sum, food) => sum + (food.carbs || 0), 0);
      const totalFats = this.foods.reduce((sum, food) => sum + (food.fats || 0), 0);
  
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
    
    clearSearchResults = () => {
        this.searchResults = [];
    }

    removeFood = (foodId: string) => {
      this.foods = this.foods.filter((food) => food.id !== foodId);
    };
    
    selectFood = (foodName: string) => {
      const selectedFood = this.searchResults.find((food) => food.name === foodName);
      return selectedFood;
    };

}