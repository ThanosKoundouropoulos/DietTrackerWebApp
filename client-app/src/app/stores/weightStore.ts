import { makeAutoObservable, runInAction } from "mobx";
import { Weight, WeightFormValues } from "../models/weight";
import agent from "../api/agent";

export default class WeightStore{
    weightIns: Weight[] = [];
    isCreating = false;
    loading = false;
  
    constructor() {
      makeAutoObservable(this);
    }

    createWeightIn = async (weight: WeightFormValues) => {
      try {
          this.setCreating(true);
          const newWeightIn = new Weight(weight);
          await agent.WeightIns.create(weight);
          runInAction(() => this.weightIns.push(newWeightIn));
      } catch (error) {
          console.error('Error creating weight entry:', error);
      } finally {
          this.setCreating(false);
      }
  };;
  
  

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
            if (weights.length >0) {
              weights.forEach(weight =>{
                runInAction(() => {
                   this.weightIns.push(weight);
                 });
              })
            }   
          } catch (error) {
            console.error('Error loading weights:', error);
          } finally {
            this.loading = false;
          }
    };

    removeWeight = (weightId: string) => {
      this.weightIns = this.weightIns.filter((weight) => weight.id !== weightId);
    };
  
    setCreating = (state: boolean) => {
        this.isCreating = state;
    }

}