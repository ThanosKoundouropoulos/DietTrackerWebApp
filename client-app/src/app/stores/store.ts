import { createContext, useContext } from "react";
import ModalStore from "./modalStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import DietGoalStore from "./dietGoalStore";
import FoodStore from "./foodStore";
import MealStore from "./mealStore";
import WeightStore from "./weightStore";

//This file is the store that is going to store our stores 
interface Store {
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    dietGoalStore: DietGoalStore;
    foodStore: FoodStore;
    mealStore: MealStore;
    weightStore: WeightStore;
   

}

export const store: Store ={
  
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    foodStore: new FoodStore(),
    mealStore: new MealStore(),
    dietGoalStore: new DietGoalStore(),
    weightStore: new WeightStore()

}

export const StoreContext = createContext(store);


export function useStore() {
    return useContext(StoreContext);
}