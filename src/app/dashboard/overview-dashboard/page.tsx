"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign, EllipsisVertical } from "lucide-react";
import Link from "next/link";
import TransactionCharts from "./components/TransactionsChart";
import { apiCall } from "@/helper/apiCall";
import { useEffect, useState } from "react";
import AttendeesChart from "./components/AttendeesChart";

function MainDashboardPage() {
  const [totalTransaction, setTotalTransaction] = useState<number>(0);
  const [totalAttendance, setTotalAttendance] = useState<number>(0);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);

  const getEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      // const res = await apiCall.get("/events/:organizer_id");
      const res = await apiCall.get("/transaction/detail", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const total_attendance = await apiCall.get("/events/attendance", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // total attendance semua event
      const totalAttendanceCount = total_attendance.data.data.reduce(
        (acc: number, event: any) =>
          acc + (event.confirmed_attendance_length || 0),
        0
      );
      setTotalAttendance(totalAttendanceCount);

      // totalrevenue
      const revenue = res.data.data.reduce((acc: number, item: any) => {
        const price = item.ticketType?.price ?? 0;
        const qty = item.quantity ?? 0;
        return acc + price * qty;
      }, 0);

      console.log(revenue);
      setTotalRevenue(revenue);

      // console.log(res.data.data.length);
      console.log(res.data.data);
      console.log(total_attendance.data.data);
      console.log(totalAttendanceCount);

      setTotalTransaction(res.data.data.length);

      // const data = res.data.data;
      // console.log(data);

      // setTotalEvents(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  // Content
  // Summary Card
  const summaryCard = [
    {
      id: 1,
      name: "Total Sales",
      icon: <CircleDollarSign />,
      content: totalTransaction,
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, repellat.",
      CTA: <EllipsisVertical />,
      url: "/dashboard/manage-events",
    },
    {
      id: 2,
      name: "Total Attendance",
      icon: <CircleDollarSign />,
      content: totalAttendance,
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, repellat.",
      CTA: <EllipsisVertical />,
      url: "/dashboard/transactions",
    },
    {
      id: 3,
      name: "Total Revenue",
      icon: <CircleDollarSign />,
      content: totalRevenue.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      }),
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, repellat.",
      CTA: <EllipsisVertical />,
      url: "/dashboard/transactions",
    },
  ];

  // Chart
  const chartCard = [
    {
      id: 1,
      name: "Total Sales",
      content: <TransactionCharts />,
    },
    {
      id: 2,
      name: "Total Attendees",
      content: <AttendeesChart />,
    },
  ];

  return (
    <section>
      <div id="dashboard-container" className="">
        <p className="my-5 text-xl font-bold">Report Overview</p>
        <div
          id="card-summary"
          className="mt-4  grid grid-cols-1 md:grid-cols-3 max-xl:gap-y-5 gap-x-5 "
        >
          {summaryCard.map((e) => (
            <Card key={e.id} className="shadow-md p-6 ">
              <CardHeader className="">
                <div className="flex items-center justify-between ">
                  <div className="flex gap-x-2 items-center ">
                    <div className="bg-orange-500 text-white rounded-full p-2">
                      {e.icon}
                    </div>
                    <CardTitle className="text-xl">{e.name}</CardTitle>
                  </div>

                  <Link href={e.url} className="text-gray-700">
                    {e.CTA}
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-y-5">
                  <p className="lg:text-4xl font-semibold text-center">
                    {e.content}
                  </p>
                  <div>{e.desc}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div id="chart" className="mt-10">
          <p className="my-5 text-xl font-bold">Report Chart</p>
          <div className="flex gap-x-5 flex-col xl:flex-row max-xl:gap-y-5">
            {chartCard.map((e) => (
              <Card key={e.id} className="w-full xl:w-1/2 p-8">
                <CardHeader>
                  <CardTitle>{e.name}</CardTitle>
                </CardHeader>
                <CardContent>{e.content}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainDashboardPage;
