

export interface DietGoal {
    id: string;
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
    age:  string;
    weight:  string;
    height: string;
    activityLevel:  string;
    gender:  string;
    plan:  string;
    

  }

  export class DietGoal implements DietGoal{
    constructor(init?: DietGoalFormValues){
      Object.assign(this, init);
    }
  }

  export class DietGoalFormValues{
    id?: string = undefined;
    age: string ="";
    weight: string= "";
    height: string ="";
    activityLevel: string = "";
    gender: string = "";
    plan: string ="";

    constructor(dietGoal?: DietGoalFormValues) {
      if (dietGoal) {
          this.id = dietGoal.id;
          this.age = dietGoal.age;
          this.weight = dietGoal.weight;
          this.height = dietGoal.height;
          this.activityLevel = dietGoal.activityLevel;
          this.gender = dietGoal.gender;
          this.plan = dietGoal.plan;
          
      }
    }
  }
  