import { createContext, useContext } from "react";
import ModalStore from "./modalStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";

//This file is the store that is goin to store our stores 
interface Store {
  
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
   

}

export const store: Store ={
  
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore()

}

export const StoreContext = createContext(store);


export function useStore() {
    return useContext(StoreContext);
}