"use client";
import { useEffect, useState } from "react";
import { apiCall } from "@/helper/apiCall";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function TransactionChart() {
  const [chartData, setChartData] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await apiCall.get("/transaction/detail", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Group data per event
      const grouped = res.data.data.reduce((acc: any, trx: any) => {
        const eventName = trx.detail_event.name;
        const revenue = trx.ticketType.price * trx.quantity;
        if (!acc[eventName]) {
          acc[eventName] = { name: eventName, totalSales: 0 };
        }
        acc[eventName].totalSales += revenue;
        return acc;
      }, {});

      setChartData(Object.values(grouped));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    // Data
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => value.toLocaleString("id-ID")} />
        <Tooltip formatter={(value) => `Rp ${value.toLocaleString("id-ID")}`} />
        <Bar dataKey="totalSales" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default TransactionChart;
