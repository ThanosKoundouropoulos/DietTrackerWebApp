
import { observer } from 'mobx-react-lite';
import { Doughnut } from 'react-chartjs-2';
import { useStore } from '../../stores/store';

function round(value: number, precision: number) {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

const TargetMacrosDonutChart = () => {
  const { dietGoalStore: {consumedProteins, consumedCarbs, consumedFats } } = useStore();
  const { userStore: {dietGoal } } = useStore();

  // Calculate percentages
  const proteinPercentage = (consumedProteins / dietGoal?.proteins!) * 100;
  const fatPercentage = (consumedFats / dietGoal?.fats!) * 100;
  const carbPercentage = (consumedCarbs / dietGoal?.carbs!) * 100;

  // Chart data
  const donutChartData = {
    labels: ['Proteins', 'Carbs', 'Fats'],
    datasets: [
      {
        data: [round(proteinPercentage, 1), round(carbPercentage, 1), round(fatPercentage, 1)],
        backgroundColor: ['#FF9966', 'burlywood', 'lightgreen'],
        hoverBackgroundColor: ['#FF9966', 'burlywood', 'lightgreen'],
        borderColor: '#233142',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
      <Doughnut data={donutChartData} />
    </div>
  );
};

export default observer(TargetMacrosDonutChart);
