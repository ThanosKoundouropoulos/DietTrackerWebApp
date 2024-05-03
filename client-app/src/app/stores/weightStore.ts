import { makeAutoObservable, runInAction } from "mobx";
import { MealFormValues } from "../models/meal";
import { Weight, WeightFormValues } from "../models/weight";
import agent from "../api/agent";
import { date } from "yup";
import { each } from "chart.js/helpers";
import { format, parseISO } from "date-fns";



export default class WeightStore{
    weightIns: Weight[] = [];
    isCreating = false;
    loading = false;
  
    constructor() {
      makeAutoObservable(this);
    }

    createWeightIn = async (weight: WeightFormValues) => {
      console.error('Weight info ', weight.date, weight.weight);
      
      try {
        this.setCreating(true);
          await agent.WeightIns.create(weight);
          // await this.loadWeights();
      } catch (error) {
        console.error('Error creating weight entry:', error);
      } finally {
        this.setCreating(false);
      }
    };
  
  

    deleteWeight = async ( weightId: string ) => {
        try {
            await agent.WeightIns.delete(weightId);
            runInAction(() => this.removeWeight(weightId));   
          } catch (error) {
            console.error('Error deleting weight entry:', error);
            throw error;
          }
    };

    loadWeights = async () => {
        try {
            this.loading = true;
            const weights = await agent.WeightIns.list();
            weights.forEach(weight =>{
              console.error('Weight info list 1 iso', weight.date?.toISOString() , weight.weight);
              weight.date = new Date(weight.date!);
              console.error('Weight info list 2', weight.date , weight.weight);
            })
            runInAction(() => {
             // this.weightIns = this.sortWeightsByDate(weights);
              this.weightIns = weights.map((win) => ({
                ...win,
                weight: win.weight,
                date: win.date
            
              }))
            });
         
          } catch (error) {
            console.error('Error loading weights:', error);
          } finally {
            this.loading = false;
          }
    };

 
    sortWeightsByDate = (weights: Weight[]) => {
        return weights.slice().sort((a, b) => b.date!.getTime() - a.date!.getTime());
    };
  

    removeWeight = (weightId: string) => {
      this.weightIns = this.weightIns.filter((weight) => weight.id !== weightId);
    };
  
    setCreating = (state: boolean) => {
        this.isCreating = state;
    }

}