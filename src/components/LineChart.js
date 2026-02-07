import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from "recharts";

const SalesChart = () => {
  const [salesData, setSalesData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("1_month");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMonthlyView, setIsMonthlyView] = useState(false);

  const periodOptions = [
    { value: "1_day", label: "📅 1 Hari Terakhir", days: 1 },
    { value: "1_week", label: "📅 1 Minggu Terakhir", days: 7 },
    { value: "1_month", label: "📅 1 Bulan Terakhir", days: 30 },
    { value: "1_year", label: "📅 1 Tahun Terakhir", days: 365 },
  ];

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          "https://686fecda4838f58d11236668.mockapi.io/SalesInformation/V1/Chartify"
        );

        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setSalesData(data);
          } else {
            setSalesData([]);
            setError("API tidak mengembalikan data.");
          }
        } else {
          setError(`Gagal mengambil data. Status: ${response.status}`);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sales data:", error);
        setSalesData([]);
        setError("Gagal menyambung ke API.");
        setLoading(false);
      }
    };
    fetchSalesData();
  }, []);

  useEffect(() => {
    if (salesData.length > 0) {
      const selectedOption = periodOptions.find((opt) => opt.value === selectedPeriod);
      const daysToShow = selectedOption?.days || 30;
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - daysToShow);
      const monthlyView = daysToShow > 31;
      setIsMonthlyView(monthlyView);

      const filteredData = salesData.filter((data) => {
        const saleDate = new Date(data.tgl_penjualan * 1000);
        return saleDate >= startDate && saleDate <= endDate;
      });

      const grouped = {};
      filteredData.forEach((data) => {
        const saleDate = new Date(data.tgl_penjualan * 1000);
        const key = monthlyView
          ? `${saleDate.getFullYear()}-${(saleDate.getMonth() + 1).toString().padStart(2, "0")}`
          : saleDate.toISOString().split("T")[0];

        if (!grouped[key]) {
          grouped[key] = { vehicles: new Set(), count: 0 };
        }
        grouped[key].vehicles.add(data.nama_kendaraan);
        grouped[key].count += 1;
      });

      const formattedData = Object.entries(grouped).map(([key, { vehicles, count }]) => {
        const dateObj = monthlyView ? new Date(`${key}-01`) : new Date(key);
        return {
          date: key,
          displayDate: monthlyView
            ? dateObj.toLocaleDateString("id-ID", { month: "short", year: "numeric" })
            : dateObj.toLocaleDateString("id-ID", { day: "2-digit", month: "short" }),
          vehicles: Array.from(vehicles),
          totalProduk: count,
        };
      });

      formattedData.sort((a, b) => new Date(a.date) - new Date(b.date));
      setChartData(formattedData);
    }
  }, [salesData, selectedPeriod]);

  if (loading) return <div style={{ textAlign: "center", padding: "50px" }}>⏳ Memuat data...</div>;

  return (
    <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "16px", boxShadow: "0 6px 20px rgba(0,0,0,0.1)" }}>
       <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)} style={{ marginBottom: "20px", padding: "10px" }}>
          {periodOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
       </select>
       <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="displayDate" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="totalProduk" stroke="#2196F3" strokeWidth={3} />
            <Brush dataKey="displayDate" height={30} stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;