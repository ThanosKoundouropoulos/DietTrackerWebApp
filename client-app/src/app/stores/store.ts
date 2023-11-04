import { createContext, useContext } from "react";
import ModalStore from "./modalStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import DietGoalStore from "./dietGoalStore";

//This file is the store that is goin to store our stores 
interface Store {
  
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    dietGoalStore: DietGoalStore;
   

}

export const store: Store ={
  
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    dietGoalStore: new DietGoalStore()

}

export const StoreContext = createContext(store);


export function useStore() {
    return useContext(StoreContext);
}