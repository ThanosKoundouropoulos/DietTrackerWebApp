import React from 'react';
import { parseISO, compareAsc } from 'date-fns';
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
import { faker } from '@faker-js/faker';
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
      const { weightIns} = weightStore;
// Sort weightIns by date in ascending order
const sortedWeights = weightIns
  .slice()
  //.sort((a, b) => compareAsc(parseISO(a.date.toISOString()), parseISO(b.date.toISOString())));

// Get the first weight entry to determine the range
const firstWeight = sortedWeights[0];

// Generate labels based on the first weight entry
const labels = sortedWeights.map(weight => (weight.date ? weight.date.getTime() : 0));

// Extract weights for each label
const dataSets = weightIns.map(weight => weight.weight);

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
};
      
    return(

        <Container  className="lineContainer">
          <Line data={data} options={options} />;
       </Container>
    )
})