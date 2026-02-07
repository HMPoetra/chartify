import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const BarChart = () => {
  const [salesData, setSalesData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("1_week");
  const [selectedVehicles, setSelectedVehicles] = useState([]);

  const colorPalette = [
    "rgba(102, 187, 106, 0.7)",
    "rgba(255, 179, 71, 0.7)",
    "rgba(93, 156, 236, 0.7)",
    "rgba(255, 128, 171, 0.7)",
    "rgba(179, 136, 255, 0.7)",
    "rgba(77, 208, 225, 0.7)",
    "rgba(255, 213, 79, 0.7)",
    "rgba(141, 110, 99, 0.7)",
    "rgba(189, 189, 189, 0.7)",
    "rgba(205, 220, 57, 0.7)",
  ];

  const borderColorPalette = colorPalette.map((color) =>
    color.replace("0.7", "1")
  );

  const periodOptions = [
    { value: "1_day", label: "📅 1 Hari Terakhir" },
    { value: "1_week", label: "📅 1 Minggu Terakhir" },
    { value: "1_month", label: "📅 1 Bulan Terakhir" },
    { value: "1_year", label: "📅 1 Tahun Terakhir" },
  ];

  const getDateRange = (period) => {
    const now = new Date();
    const endDate = new Date(now);
    let startDate = new Date(now);

    switch (period) {
      case "1_day":
        startDate.setDate(now.getDate() - 1);
        break;
      case "1_week":
        startDate.setDate(now.getDate() - 7);
        break;
      case "1_month":
        startDate.setMonth(now.getMonth() - 1);
        break;
      case "1_year":
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 7);
    }
    return { startDate, endDate };
  };

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch(
          "https://686fecda4838f58d11236668.mockapi.io/SalesInformation/V1/Chartify"
        );
        const data = await response.json();
        setSalesData(data);
        const uniqueVehicleNames = [
          ...new Set(data.map((item) => item.nama_kendaraan)),
        ];
        setSelectedVehicles(uniqueVehicleNames);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };
    fetchSalesData();
  }, []);

  const filterSalesData = () => {
    const { startDate, endDate } = getDateRange(selectedPeriod);
    const filteredData = salesData.filter((data) => {
      const saleDate = new Date(data.tgl_penjualan * 1000);
      return saleDate >= startDate && saleDate <= endDate;
    });
    filteredData.sort((a, b) => a.tgl_penjualan - b.tgl_penjualan);
    return filteredData;
  };

  const filteredData = filterSalesData();
  const uniqueVehicleNames = [
    ...new Set(salesData.map((data) => data.nama_kendaraan)),
  ];

  const vehicleOptions = uniqueVehicleNames.map((name) => ({
    value: name,
    label: name,
  }));

  const handleVehicleChange = (selectedOptions) => {
    setSelectedVehicles(
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };

  const handlePeriodChange = (selectedOption) => {
    setSelectedPeriod(selectedOption.value);
  };

  const { startDate: startDateObj, endDate: endDateObj } = getDateRange(selectedPeriod);
  const dayCount = Math.ceil((endDateObj - startDateObj) / (1000 * 60 * 60 * 24));
  
  let chartData;
  let dateLabels;

  if (dayCount > 31) {
    const monthlyData = {};
    filteredData.forEach((data) => {
      const saleDate = new Date(data.tgl_penjualan * 1000);
      const monthKey = `${saleDate.getFullYear()}-${saleDate.getMonth() + 1}`;
      if (!monthlyData[monthKey]) monthlyData[monthKey] = {};
      if (!monthlyData[monthKey][data.nama_kendaraan]) monthlyData[monthKey][data.nama_kendaraan] = 0;
      monthlyData[monthKey][data.nama_kendaraan] += 1;
    });

    dateLabels = Object.keys(monthlyData)
      .map((monthKey) => {
        const [year, month] = monthKey.split("-");
        return { monthKey, date: new Date(year, month - 1) };
      })
      .sort((a, b) => a.date - b.date)
      .map(({ monthKey }) => {
        const [year, month] = monthKey.split("-");
        const date = new Date(year, month - 1);
        return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(date);
      });

    const datasets = selectedVehicles.map((vehicleName, index) => {
      const dataValues = Object.keys(monthlyData)
        .sort()
        .map((monthKey) => monthlyData[monthKey][vehicleName] || 0);
      return {
        label: vehicleName,
        data: dataValues.map(v => v > 0 ? v : null),
        backgroundColor: colorPalette[index % colorPalette.length],
        borderColor: borderColorPalette[index % colorPalette.length],
        borderWidth: 1,
        borderRadius: 4,
        barThickness: 20,
      };
    });

    chartData = { labels: dateLabels, datasets };
  } else {
    dateLabels = Array.from({ length: dayCount }, (_, i) => {
      const day = new Date(startDateObj);
      day.setDate(startDateObj.getDate() + i);
      return day.toLocaleDateString();
    });

    const datasets = selectedVehicles.map((vehicleName, index) => {
      const salesCount = Array.from({ length: dayCount }, (_, i) => {
        const day = new Date(startDateObj);
        day.setDate(startDateObj.getDate() + i);
        return filteredData.filter((data) => {
          const saleDate = new Date(data.tgl_penjualan * 1000);
          return data.nama_kendaraan === vehicleName && saleDate.toDateString() === day.toDateString();
        }).length;
      });

      return {
        label: vehicleName,
        data: salesCount.map(v => v > 0 ? v : null),
        backgroundColor: colorPalette[index % colorPalette.length],
        borderColor: borderColorPalette[index % colorPalette.length],
        borderWidth: 1,
        borderRadius: 4,
        barThickness: 20,
      };
    });

    chartData = { labels: dateLabels, datasets };
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top" },
      title: { display: true, text: "Total Sales Units by Date Range", font: { size: 20 } },
      datalabels: { display: false },
    },
    scales: {
      y: { beginAtZero: true, max: 5, ticks: { stepSize: 1 } },
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>Vehicle Sales Overview</h2>
      <div style={{ marginBottom: "30px", padding: "25px", backgroundColor: "#f8f9fa", borderRadius: "12px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div>
          <label style={{ fontWeight: "bold", display: "block" }}>⏰ Pilih Periode:</label>
          <Select options={periodOptions} value={periodOptions.find(o => o.value === selectedPeriod)} onChange={handlePeriodChange} />
        </div>
        <div>
          <label style={{ fontWeight: "bold", display: "block" }}>🚗 Select Vehicles:</label>
          <Select isMulti options={vehicleOptions} value={vehicleOptions.filter(o => selectedVehicles.includes(o.value))} onChange={handleVehicleChange} />
        </div>
      </div>
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "12px", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)", padding: "20px" }}>
        <div style={{ height: "400px", width: "100%" }}>
          {filteredData.length > 0 && selectedVehicles.length > 0 ? (
            <Bar data={chartData} options={chartOptions} />
          ) : (
            <p style={{ textAlign: "center", color: "#888", padding: "50px 0" }}>Data tidak dapat ditampilkan.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BarChart;