import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';

Chart.register(ArcElement);

const PieChart = ({ data }) => {
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

  return <Pie data={data} options={options} />;
};

export default PieChart;
