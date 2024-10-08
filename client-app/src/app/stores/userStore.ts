import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../models/user";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/Routes";
import { DietGoal } from "../models/dietGoal";
import cloneDeep from 'lodash/cloneDeep';




export default class UserStore {
    user: User | null = null;
    dietGoal: DietGoal | null = null;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    get hasDietPlan() {
        return !!this.dietGoal;
    }

    login = async (creds: UserFormValues) => {
        try {       
            const user = await agent.Account.login(creds);
            console.log('User data:', user);
            store.commonStore.setToken(user.token);
            runInAction(() => {
                this.user = user
                this.dietGoal= user.dietGoal!;
            });
            router.navigate('/tracker');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    register = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    logout =() => {
        const mealStore = store.mealStore;
        const foodStore = store.foodStore;
        const wStore = store.weightStore;
        store.commonStore.setToken(null);
        this.user = null;
        this.dietGoal = null;
        mealStore.meals.length =0;
        mealStore.mealEntries.length=0;
        foodStore.foods.length=0;
        wStore.weightIns.length =0;
        router.navigate('/');
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() =>{ 
                this.user = user;
                this.dietGoal= user.dietGoal!;
                this.loadRemainingDietGoal(this.dietGoal!);
            })
            
        } catch (error) {
            console.log(error);
        }
    }

    loadRemainingDietGoal = async (dietGoal: DietGoal) => {
        const dietGoalStore = store.dietGoalStore;
        const remainingDietGoal = cloneDeep(dietGoal);
      
        runInAction(() => {
          dietGoalStore.loadRemainingDietGoal(remainingDietGoal);
        });
      };

    updateGoal =(dietGoal: DietGoal) => {
        this.dietGoal!.calories = dietGoal.calories; 
        this.dietGoal!.proteins = dietGoal.proteins; 
        this.dietGoal!.carbs = dietGoal.carbs; 
        this.dietGoal!.fats = dietGoal.fats; 
    }



}