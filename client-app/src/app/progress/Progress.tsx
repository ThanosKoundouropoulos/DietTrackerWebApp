import { observer } from "mobx-react-lite";
import WeightHistory from "./weightHistory";
import WeightChart from "./weightChart";
import { useEffect } from "react";
import { useStore } from "../stores/store";




 

export default observer(function Progress() {
    const {weightStore} = useStore();
    const {loadWeights,weightIns} = weightStore;

    useEffect(() => {
        
     // if (weightIns.length === 0) loadWeights();
    },[loadWeights,weightIns])
  
 
    return (
        <>
            <WeightHistory/>
            <WeightChart/>
        </>
      
    )
  })