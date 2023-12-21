

export interface Food {
    id: string;
    name: string;
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
    amountConsumed?: number;

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
  