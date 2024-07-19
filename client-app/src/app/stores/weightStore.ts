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
      console.error('Weight info ', weight.dateRecorded, weight.weight);
      try {
          this.setCreating(true);

          const newWeightIn = new Weight(weight);
          console.log('Payload to be sent:', newWeightIn); // Log the payload
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
            console.log('Id to be sent:', weightId);
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
                console.error('Weight info ', weight.dateRecorded, weight.weight);
                runInAction(() => {
                  // this.weightIns = this.sortWeightsByDate(weights);
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

 
    sortWeightsByDate = (weights: Weight[]) => {
      //  return weights.slice().sort((a, b) => b.date!.getTime() - a.date!.getTime());
    };
  

    removeWeight = (weightId: string) => {
      this.weightIns = this.weightIns.filter((weight) => weight.id !== weightId);
    };
  
    setCreating = (state: boolean) => {
        this.isCreating = state;
    }

}