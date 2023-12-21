import {
    Chart as ChartJs,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js'
import { observer } from 'mobx-react-lite';

import { Pie } from 'react-chartjs-2';
import { useStore } from '../../stores/store';

ChartJs.register(
    ArcElement,
    Tooltip,
    Legend
);
function round(value: number, precision: number) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

const StatisticsPieChart = () => {
      const {dietGoalStore : {consumedCalories,consumedProteins,consumedCarbs,consumedFats}} = useStore();
     
      // Calculate percentages
      const proteinPercentage = ((consumedProteins*4) / consumedCalories) * 100;
      const fatPercentage = ((consumedFats*9) / consumedCalories) * 100;
      const carbPercentage = ((consumedCarbs*4) / consumedCalories) * 100;
    
     // Chart data
   const macroChartData = {
     labels: ['proteins','carbs','fats'],
     datasets: [
       {
         data: [round(proteinPercentage,1),  round(carbPercentage,1),round(fatPercentage,1)],
         backgroundColor: ['#FF9966', 'burlywood', 'lightgreen'],
         hoverBackgroundColor: ['#FF9966', 'burlywood', 'lightgreen'],
         borderColor: '#233142', 
         borderWidth: 2
       }
     ],
     
   };

  
    return (
      <div>
        
        <Pie
          data = {macroChartData}>
        
        </Pie>
      </div>
    );
  };
  
  export default observer(StatisticsPieChart);

