import { DietGoal } from "./dietGoal";

export interface User {
    username: string;
    displayName: string;
    token: string;
    hasDietPlan : boolean;
    dietGoal?: DietGoal;
 }
 
 export interface UserFormValues {
     username?: string;
     email: string;
     password: string;
     displayName?: string;
  }