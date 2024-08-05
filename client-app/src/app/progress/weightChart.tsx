import { compareAsc, format } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/store';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export default observer(function WeightChart(){
  const { weightStore } = useStore();
  const { weightIns } = weightStore;

  // Sort weightIns by date in ascending order
  const sortedWeights = weightIns
    .slice()
    .sort((a, b) => compareAsc(a.dateRecorded!, b.dateRecorded!));

  const labels = sortedWeights.map(weight => (weight.dateRecorded ? format(new Date(weight.dateRecorded), 'dd MMM yyyy') : ''));
  const dataSets = sortedWeights.map(weight => weight.weight);

  const data = {
    labels,
    datasets: [
      {
        label: 'Weight Progress',
        data: dataSets,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Weight Progress',
      },
    },
    scales: {
      x: {
        ticks: {
          callback: function(value: number | string, index: number, values: any[]): string {
            return labels[index]; // Use preformatted labels
          }
        }
      }
    }
  };

      
    return(

        <Container  className="lineContainer">
          <Line data={data} options={options} />
       </Container>
    )
})