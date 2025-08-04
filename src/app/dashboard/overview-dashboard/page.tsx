"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign, EllipsisVertical } from "lucide-react";
import Link from "next/link";
import TransactionCharts from "./components/TransactionsChart";
import { apiCall } from "@/helper/apiCall";
import { useEffect, useState } from "react";

const chartCard = [
  {
    id: 1,
    name: "Transactions",
    content: <TransactionCharts />,
  },
  {
    id: 2,
    name: "Events",
    content: "Content",
  },
];

function MainDashboardPage() {
  const [totalEvents, setTotalEvents] = useState<number>(0);

  const getEvents = async () => {
    try {
      const res = await apiCall.get("/events/:organizer_id");
      console.log(res);
      setTotalEvents(res.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  // Map
  const summaryCard = [
    {
      id: 1,
      name: "Total Events",
      icon: <CircleDollarSign />,
      content: totalEvents,
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, repellat.",
      CTA: <EllipsisVertical />,
      url: "/dashboard/eventspage",
    },
    {
      id: 2,
      name: "Ticket Sold",
      icon: <CircleDollarSign />,
      content: 999,
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, repellat.",
      CTA: <EllipsisVertical />,
      url: "#",
    },
    {
      id: 3,
      name: "Total Customer",
      icon: <CircleDollarSign />,
      content: 999,
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, repellat.",
      CTA: <EllipsisVertical />,
      url: "#",
    },
    {
      id: 4,
      name: "Recent Transaction",
      icon: <CircleDollarSign />,
      content: 999,
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, repellat.",
      CTA: <EllipsisVertical />,
      url: "#",
    },
  ];

  return (
    <section>
      <div id="dashboard-container" className="">
        <p className="my-5 text-xl font-bold">Report Overview</p>
        <div
          id="card-summary"
          className="mt-4  grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 max-xl:gap-y-5 gap-x-5 "
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
                  <div>{e.content}</div>
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
              <Card key={e.id} className="w-full xl:w-1/2">
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
