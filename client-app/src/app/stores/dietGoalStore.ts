import { makeAutoObservable, runInAction } from "mobx";

import agent from "../api/agent";




import { store } from "./store";
import { DietGoal, DietGoalFormValues } from "../models/dietGoal";

interface Macronutrients {
    carbs: number;
    protein: number;
    fat: number;
  }

export default class DietGoalStore{
   selectedDietGoal: DietGoal | undefined = undefined;
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
      
        // Calculate BMR 
        let bmr: number;
        let calorieIntake: number;
        if (gender === "male") {
          bmr = 88.362 + 13.397 * weightKg + 4.799 * heightM - 5.677 * age;
        } else {
          bmr = 447.593 + 9.247 * weightKg + 3.098 * heightM - 4.330 * age;
        }
    
         calorieIntake = bmr * activityLevel;
        if (plan === "lose") {
            calorieIntake -= 500;
          } else {
            calorieIntake += 300;
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

 

   

   

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

   
  

    
    updateActivity = async (activity: DietGoalFormValues) => {
    
        try {
            
            runInAction(() => {
               
            })
        } catch (error) {
            console.log(error);
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
          
            runInAction(() => {
               
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false
            })
        }
    }

  
}