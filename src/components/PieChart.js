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
        setError("Gagal menyambung ke API. Periksa sambungan internet.");
        setLoading(false);
      }
    };
    fetchSalesData();
  }, []);

  useEffect(() => {
    if (salesData.length > 0) {
      processChartData();
    } else {
      setChartData([]);
    }
  }, [salesData, selectedPeriod]);

  const processChartData = () => {
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
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{ backgroundColor: "white", padding: "15px", border: "1px solid #ccc", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", maxWidth: "300px" }}>
          <p style={{ margin: "0 0 10px 0", fontWeight: "bold", fontSize: "14px" }}>
            📅 {new Date(data.date).toLocaleDateString("id-ID", { year: "numeric", month: "long", ...(isMonthlyView ? {} : { day: "numeric", weekday: "long" }) })}
          </p>
          <p style={{ margin: "0 0 8px 0", color: "#2196F3", fontWeight: "bold" }}>🚗 Total Unit Terjual: {data.totalProduk} unit</p>
          <p style={{ margin: 0, fontSize: "12px", color: "#666" }}>Model terjual: {data.vehicles.join(", ") || "Tidak ada"}</p>
        </div>
      );
    }
    return null;
  };

  const uniqueModels = [...new Set(salesData.map((item) => item.nama_kendaraan))];
  const selectedOption = periodOptions.find((opt) => opt.value === selectedPeriod);
  const totalDays = selectedOption?.days || 30;

  const totalUnitTerjual = salesData.filter((data) => {
    const saleDate = new Date(data.tgl_penjualan * 1000);
    const now = new Date();
    const start = new Date();
    start.setDate(now.getDate() - totalDays);
    return saleDate >= start && saleDate <= now;
  }).length;

  if (loading) {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px", color: "#666" }}>⏳ Memuat data...</div>;
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <div style={{ marginBottom: "30px", padding: "25px", backgroundColor: "#f8f9fa", borderRadius: "12px", display: "grid", gridTemplateColumns: "1fr auto", gap: "20px", alignItems: "center" }}>
        <div>
          <label style={{ fontWeight: "bold", marginBottom: "10px", display: "block", color: "#333" }}>⏰ Pilih Periode Waktu:</label>
          <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)} style={{ padding: "12px 16px", borderRadius: "8px", border: "2px solid #ddd", fontSize: "14px" }}>
            {periodOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div style={{ padding: "15px 20px", backgroundColor: "#e3f2fd", borderRadius: "12px", textAlign: "center" }}>
          <div style={{ fontSize: "24px" }}>🏢</div>
          <div style={{ fontSize: "16px", color: "#1976d2", fontWeight: "bold" }}>{uniqueModels.length} Model Toyota</div>
          <div style={{ fontSize: "12px", color: "#666" }}>Tersedia</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginBottom: "30px" }}>
        <div style={{ padding: "25px", backgroundColor: "white", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", borderLeft: "5px solid #4CAF50" }}>
          <h3 style={{ margin: "0", fontSize: "24px" }}>{totalUnitTerjual}</h3>
          <p style={{ margin: "0", fontWeight: "bold", fontSize: "14px" }}>Total Unit Terjual</p>
        </div>
        <div style={{ padding: "25px", backgroundColor: "white", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", borderLeft: "5px solid #FF9800" }}>
          <h3 style={{ margin: "0", fontSize: "24px" }}>{totalDays > 0 ? (totalUnitTerjual / totalDays).toFixed(1) : 0}</h3>
          <p style={{ margin: "0", fontWeight: "bold", fontSize: "14px" }}>Rata-rata Harian</p>
        </div>
      </div>

      <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "16px", boxShadow: "0 6px 20px rgba(0,0,0,0.1)" }}>
        {chartData.length > 0 ? (
          <div style={{ width: "100%", height: 500 }}>
            <ResponsiveContainer>
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="displayDate" angle={isMonthlyView ? 0 : -45} textAnchor={isMonthlyView ? "middle" : "end"} height={60} />
                <YAxis domain={[0, 'auto']} />
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="top" height={36} />
                <Line type="monotone" dataKey="totalProduk" stroke="#2196F3" strokeWidth={3} name="Total Unit Terjual" />
                <Brush dataKey="displayDate" height={30} stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "50px" }}>Tidak ada data tersedia.</div>
        )}
      </div>
    </div>
  );
};

export default SalesChart;