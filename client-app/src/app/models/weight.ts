

export interface Weight {
    id: string;
    weight: number;
    date: Date | null;

  }

 export class Weight implements Weight{
    constructor(init?: WeightFormValues){
      Object.assign(this, init);
    }
  }

  export class WeightFormValues {
    id?: string = undefined;
    weight: number = 0;
    date: Date | null=null;
  
    constructor(meal?: WeightFormValues) {
      if (meal) {
        this.id = meal.id;
        this.weight = meal.weight;
        this.date = meal.date;
        
      }
    }
  }