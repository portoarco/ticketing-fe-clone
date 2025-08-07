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

function AttendeesChart() {
  const [chartData, setChartData] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await apiCall.get("/events/attendance", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const mapped = res.data.data.map((event: any) => ({
        name: event.name,
        totalAttendance: event.confirmed_attendance_length || 0,
      }));

      setChartData(mapped);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => `${value} attendees`} />
        <Bar dataKey="totalAttendance" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default AttendeesChart;
