

export interface Food {
    id: string;
    name: string;
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
    amountConsumed?: number;
    // New macronutrient fields
    caffeine: number;
    sugars: number;
    fiber: number;
    calcium: number;
    iron: number;
    magnesium: number;
    potassium: number;
    sodium: number;
    zinc: number;
    retinol: number;
    vitaminA: number;
    betaCarotene: number;
    vitaminD: number;
    vitaminC: number;
    folate: number;
    vitaminB12: number;
    vitaminK: number;
    cholesterol: number;
    saturatedFattyAcids: number;
    monounsaturatedFattyAcids: number;
    polyunsaturatedFattyAcids: number;

  }

  export class Food implements Food{
    constructor(init?: FoodFormValues){
      Object.assign(this, init);
    }
  }

  export class FoodFormValues{
    id?: string = undefined;
    name: string ="";
    quantity: string= "";
    

    constructor(food?: FoodFormValues) {
      if (food) {
          this.id = food.id;
          this.name = food.name;
          this.quantity = food.quantity;
      }
    }
  }
  