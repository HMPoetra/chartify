import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, LineElement, PointElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, LineElement, PointElement);

const LineChart = ({ data }) => {
  if (!data) {
    return <p>No data available</p>;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
