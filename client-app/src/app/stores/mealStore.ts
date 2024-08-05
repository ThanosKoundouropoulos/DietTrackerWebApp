import { computed, makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Meal, MealFormValues } from "../models/meal";
import { store } from "./store";
import { Food } from "../models/Food";



export default class MealStore{
    meals: Meal[] = [];
    mealEntries: Meal[] = [];
    ingredients: Food[] = [];
    isCreating = false;
    isCreatingDB = false;
    loading = false;
    loadingInitial = false;
  
    constructor() {
      makeAutoObservable(this, {
        totalNutrients: computed,
      });
    }

    createMeal = async (meal: MealFormValues) => {
      try {
  
          const newMeal = new Meal(meal)
          newMeal.calories =Number(meal.calories);
          newMeal.proteins =Number(meal.proteins);
          newMeal.carbs =Number(meal.carbs);
          newMeal.fats =Number(meal.fats);
          newMeal.quantity =0;
          newMeal.caffeine = 0;
          newMeal.sugars = 0;
          newMeal.fiber = 0;
          newMeal.calcium = 0;
          newMeal.iron = 0;
          newMeal.magnesium = 0;
          newMeal.potassium = 0;
          newMeal.sodium = 0;
          newMeal.zinc = 0;
          newMeal.retinol = 0;
          newMeal.vitaminA = 0;
          newMeal.betaCarotene = 0;
          newMeal.vitaminD = 0;
          newMeal.vitaminC = 0;
          newMeal.folate = 0;
          newMeal.vitaminB12 = 0;
          newMeal.vitaminK = 0;
          newMeal.cholesterol = 0;
          newMeal.saturatedFattyAcids = 0;
          newMeal.monounsaturatedFattyAcids = 0;
          newMeal.polyunsaturatedFattyAcids = 0;
          await agent.Meals.create(meal);  
          this.loadMeals();      
      } catch (error) {
          console.log(error);
      }
    }

    createMealFromIngredients = async (newMeal: MealFormValues) => {
    try {
        const totalNutrients = this.ingredients.reduce((acc, ingredient) => {
        const amount = ingredient.amountConsumed ? ingredient.amountConsumed / 100 : 1;
        acc.calories += ingredient.calories * amount;
        acc.proteins += ingredient.proteins * amount;
        acc.carbs += ingredient.carbs * amount;
        acc.fats += ingredient.fats * amount;
        acc.caffeine += ingredient.caffeine * amount;
        acc.sugars += ingredient.sugars * amount;
        acc.fiber += ingredient.fiber * amount;
        acc.calcium += ingredient.calcium * amount;
        acc.iron += ingredient.iron * amount;
        acc.magnesium += ingredient.magnesium * amount;
        acc.potassium += ingredient.potassium * amount;
        acc.sodium += ingredient.sodium * amount;
        acc.zinc += ingredient.zinc * amount;
        acc.retinol += ingredient.retinol * amount;
        acc.vitaminA += ingredient.vitaminA * amount;
        acc.betaCarotene += ingredient.betaCarotene * amount;
        acc.vitaminD += ingredient.vitaminD * amount;
        acc.vitaminC += ingredient.vitaminC * amount;
        acc.folate += ingredient.folate * amount;
        acc.vitaminB12 += ingredient.vitaminB12 * amount;
        acc.vitaminK += ingredient.vitaminK * amount;
        acc.cholesterol += ingredient.cholesterol * amount;
        acc.saturatedFattyAcids += ingredient.saturatedFattyAcids * amount;
        acc.monounsaturatedFattyAcids += ingredient.monounsaturatedFattyAcids * amount;
        acc.polyunsaturatedFattyAcids += ingredient.polyunsaturatedFattyAcids * amount;
        acc.quantity += ingredient.amountConsumed || 0;
        return acc;
      }, {
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
      });
  
      newMeal.description = 'A meal created from ingredients';
      newMeal.calories = totalNutrients.calories;
      newMeal.proteins = totalNutrients.proteins;
      newMeal.carbs = totalNutrients.carbs;
      newMeal.fats = totalNutrients.fats;
      newMeal.quantity = totalNutrients.quantity;
      newMeal.caffeine = totalNutrients.caffeine;
      newMeal.sugars = totalNutrients.sugars;
      newMeal.fiber = totalNutrients.fiber;
      newMeal.calcium = totalNutrients.calcium;
      newMeal.iron = totalNutrients.iron;
      newMeal.magnesium = totalNutrients.magnesium;
      newMeal.potassium = totalNutrients.potassium;
      newMeal.sodium = totalNutrients.sodium;
      newMeal.zinc = totalNutrients.zinc;
      newMeal.retinol = totalNutrients.retinol;
      newMeal.vitaminA = totalNutrients.vitaminA;
      newMeal.betaCarotene = totalNutrients.betaCarotene;
      newMeal.vitaminD = totalNutrients.vitaminD;
      newMeal.vitaminC = totalNutrients.vitaminC;
      newMeal.folate = totalNutrients.folate;
      newMeal.vitaminB12 = totalNutrients.vitaminB12;
      newMeal.vitaminK = totalNutrients.vitaminK;
      newMeal.cholesterol = totalNutrients.cholesterol;
      newMeal.saturatedFattyAcids = totalNutrients.saturatedFattyAcids;
      newMeal.monounsaturatedFattyAcids = totalNutrients.monounsaturatedFattyAcids;
      newMeal.polyunsaturatedFattyAcids = totalNutrients.polyunsaturatedFattyAcids;

      await agent.Meals.create(newMeal);
  
      this.ingredients = [];
  
      totalNutrients.calories = 0;
      totalNutrients.proteins = 0;
      totalNutrients.carbs = 0;
      totalNutrients.fats = 0;
      totalNutrients.caffeine = 0;
      totalNutrients.sugars = 0;
      totalNutrients.fiber = 0;
      totalNutrients.calcium = 0;
      totalNutrients.iron = 0;
      totalNutrients.magnesium = 0;
      totalNutrients.potassium = 0;
      totalNutrients.sodium = 0;
      totalNutrients.zinc = 0;
      totalNutrients.retinol = 0;
      totalNutrients.vitaminA = 0;
      totalNutrients.betaCarotene = 0;
      totalNutrients.vitaminD = 0;
      totalNutrients.vitaminC = 0;
      totalNutrients.folate = 0;
      totalNutrients.vitaminB12 = 0;
      totalNutrients.vitaminK = 0;
      totalNutrients.cholesterol = 0;
      totalNutrients.saturatedFattyAcids = 0;
      totalNutrients.monounsaturatedFattyAcids = 0;
      totalNutrients.polyunsaturatedFattyAcids = 0;
      totalNutrients.quantity = 0;
     
      this.loadMeals();
  
    } catch (error) {
      console.log(error);
    }
  }
    
    addIngredient = async (selectedFood: Food, amount: number) => {
      amount = amount / 100
      const convertedFood: Food = {
        ...selectedFood,
        calories: (selectedFood.calories || 0) * amount,
        proteins: (selectedFood.proteins || 0) * amount,
        carbs: (selectedFood.carbs || 0) * amount,
        fats: (selectedFood.fats || 0) * amount,
        caffeine: (selectedFood.caffeine || 0) * amount,
        sugars: (selectedFood.sugars || 0) * amount,
        fiber: (selectedFood.fiber || 0) * amount,
        calcium: (selectedFood.calcium || 0) * amount,
        iron: (selectedFood.iron || 0) * amount,
        magnesium: (selectedFood.magnesium || 0) * amount,
        potassium: (selectedFood.potassium || 0) * amount,
        sodium: (selectedFood.sodium || 0) * amount,
        zinc: (selectedFood.zinc || 0) * amount,
        retinol: (selectedFood.retinol || 0) * amount,
        vitaminA: (selectedFood.vitaminA || 0) * amount,
        betaCarotene: (selectedFood.betaCarotene || 0) * amount,
        vitaminD: (selectedFood.vitaminD || 0) * amount,
        vitaminC: (selectedFood.vitaminC || 0) * amount,
        folate: (selectedFood.folate || 0) * amount,
        vitaminB12: (selectedFood.vitaminB12 || 0) * amount,
        vitaminK: (selectedFood.vitaminK || 0) * amount,
        cholesterol: (selectedFood.cholesterol || 0) * amount,
        saturatedFattyAcids: (selectedFood.saturatedFattyAcids || 0) * amount,
        monounsaturatedFattyAcids: (selectedFood.monounsaturatedFattyAcids || 0) * amount,
        polyunsaturatedFattyAcids: (selectedFood.polyunsaturatedFattyAcids || 0) * amount,
        amountConsumed: amount *100
      };

      this.ingredients.push(convertedFood);
    };

    removeIngredient = (id: string) => {
      this.ingredients = this.ingredients.filter(food => food.id !== id);
    };

    get totalNutrients() {
      return this.ingredients.reduce(
        (acc, food) => {
          acc.quantity += food.amountConsumed || 0;
          acc.calories += food.calories;
          acc.proteins += food.proteins;
          acc.carbs += food.carbs;
          acc.fats += food.fats;
          acc.caffeine += food.caffeine;
          acc.sugars += food.sugars;
          acc.fiber += food.fiber;
          acc.calcium += food.calcium;
          acc.iron += food.iron;
          acc.magnesium += food.magnesium;
          acc.potassium += food.potassium;
          acc.sodium += food.sodium;
          acc.zinc += food.zinc;
          acc.retinol += food.retinol;
          acc.vitaminA += food.vitaminA;
          acc.betaCarotene += food.betaCarotene;
          acc.vitaminD += food.vitaminD;
          acc.vitaminC += food.vitaminC;
          acc.folate += food.folate;
          acc.vitaminB12 += food.vitaminB12;
          acc.vitaminK += food.vitaminK;
          acc.cholesterol += food.cholesterol;
          acc.saturatedFattyAcids += food.saturatedFattyAcids;
          acc.monounsaturatedFattyAcids += food.monounsaturatedFattyAcids;
          acc.polyunsaturatedFattyAcids += food.polyunsaturatedFattyAcids;
          return acc;
        },
        {
          quantity: 0,
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
        }
      );
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
    setCreatingDB = (state: boolean) => {
        this.isCreatingDB = state;
    }

}