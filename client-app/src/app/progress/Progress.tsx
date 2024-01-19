import { observer } from "mobx-react-lite";
import WeightHistory from "./weightHistory";
import WeightChart from "./weightChart";







export default observer(function Progress() {
   
 
    return (
        <>
            <WeightHistory/>
            <WeightChart/>
        </>
      
    )
  })