import React, { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import axios from 'axios';
import dayjs from 'dayjs';

const SalesCharts = () => {
  const [chartData, setChartData] = useState({
    bar: { labels: [], datasets: [] },
    line: { labels: [], datasets: [] },
    pie: { labels: [], datasets: [] }
  });

  const processData = (data) => {
    const groupedByDate = {};

    data.forEach(item => {
      const date = dayjs.unix(item.tgl_penjualan).format('YYYY-MM-DD');
      if (!groupedByDate[date]) {
        groupedByDate[date] = 0;
      }
      groupedByDate[date] += 1;
    });

    const labels = Object.keys(groupedByDate);
    const values = Object.values(groupedByDate);

    return {
      labels,
      datasets: [{
        label: 'Sales Count',
        data: values,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    };
  };

  useEffect(() => {
    axios.get('https://686fecda4838f58d11236668.mockapi.io/SalesInformation/V1/Chartify') // Ganti URL ini dengan URL API Anda
      .then(response => {
        const processedData = processData(response.data);
        setChartData({
          bar: processedData,
          line: processedData,
          pie: processedData
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>Sales Charts</h2>
      <div>
        <h3>Bar Chart</h3>
        <Bar data={chartData.bar} />
      </div>
      <div>
        <h3>Line Chart</h3>
        <Line data={chartData.line} />
      </div>
      <div>
        <h3>Pie Chart</h3>
        <Pie data={chartData.pie} />
      </div>
    </div>
  );
};

export default SalesCharts;
