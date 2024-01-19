

export interface Meal {
    id: string;
    name: string;
    description: string;
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
    quantity: number;

  }

 export class Meal implements Meal{
    constructor(init?: MealFormValues){
      Object.assign(this, init);
    }
  }

  export class MealFormValues {
    id?: string = undefined;
    name: string = "";
    description: string = "";
    calories: number = 0;
    proteins: number = 0;
    carbs: number = 0;
    fats: number = 0;
    quantity: string = "1";
  
    constructor(meal?: MealFormValues) {
      if (meal) {
        this.id = meal.id;
        this.name = meal.name;
        this.description = meal.description;
        this.calories = meal.calories;
        this.proteins = meal.proteins;
        this.carbs = meal.carbs;
        this.fats = meal.fats;
        this.quantity = meal.quantity;
      }
    }
  }