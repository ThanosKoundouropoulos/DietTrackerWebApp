export interface Meal {
  id: string;
  name: string;
  description: string;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  quantity: number;
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

export class Meal implements Meal {
  constructor(init?: MealFormValues) {
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
  quantity: number = 1;
  // New macronutrient fields
  caffeine: number = 0;
  sugars: number = 0;
  fiber: number = 0;
  calcium: number = 0;
  iron: number = 0;
  magnesium: number = 0;
  potassium: number = 0;
  sodium: number = 0;
  zinc: number = 0;
  retinol: number = 0;
  vitaminA: number = 0;
  betaCarotene: number = 0;
  vitaminD: number = 0;
  vitaminC: number = 0;
  folate: number = 0;
  vitaminB12: number = 0;
  vitaminK: number = 0;
  cholesterol: number = 0;
  saturatedFattyAcids: number = 0;
  monounsaturatedFattyAcids: number = 0;
  polyunsaturatedFattyAcids: number = 0;

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
          this.caffeine = meal.caffeine;
          this.sugars = meal.sugars;
          this.fiber = meal.fiber;
          this.calcium = meal.calcium;
          this.iron = meal.iron;
          this.magnesium = meal.magnesium;
          this.potassium = meal.potassium;
          this.sodium = meal.sodium;
          this.zinc = meal.zinc;
          this.retinol = meal.retinol;
          this.vitaminA = meal.vitaminA;
          this.betaCarotene = meal.betaCarotene;
          this.vitaminD = meal.vitaminD;
          this.vitaminC = meal.vitaminC;
          this.folate = meal.folate;
          this.vitaminB12 = meal.vitaminB12;
          this.vitaminK = meal.vitaminK;
          this.cholesterol = meal.cholesterol;
          this.saturatedFattyAcids = meal.saturatedFattyAcids;
          this.monounsaturatedFattyAcids = meal.monounsaturatedFattyAcids;
          this.polyunsaturatedFattyAcids = meal.polyunsaturatedFattyAcids;
      }
  }
}
