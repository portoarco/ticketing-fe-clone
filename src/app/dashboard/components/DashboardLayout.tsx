"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./Mobilenavbar";
import SearchBar from "./SearchBar";
import { apiCall } from "@/helper/apiCall";
import { useUserStore } from "@/store/userStore";
import { toast } from "react-toastify";

interface DashboardProps {
  children: ReactNode;
}

function Dashboard({ children }: DashboardProps) {
  const route = useRouter();

  const [loading, setLoading] = useState(true);
  const { isVerified } = useUserStore();

  // Route protection
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      route.replace("/login");
      return;
    }

    if (isVerified === undefined) return; // tunggu sampai Zustand selesai
    if (isVerified === false) {
      toast.error("Create event first!");
      route.replace("/");
    }
  }, [route, isVerified]);

  // if (loading) {
  //   return <p className="text-center text-lg">Loading dashboard..</p>;
  // }

  return (
    <section id="dashboard-page" className="">
      <div
        id="container"
        className="flex flex-col lg:flex-row h-[100vh] lg:gap-x-5 lg:p-3 relative "
      >
        <div id="sidebar" className="max-lg:hidden  lg:basis-2/6 xl:basis-1/6 ">
          <Sidebar></Sidebar>
        </div>
        <div
          id="dashboard-content"
          className=" lg:basis-4/5 xl:basis-5/6 overflow-y-auto  max-lg:p-4 p-3   "
        >
          <div id="desktop-version-navbar" className="max-lg:hidden ">
            <DesktopNavbar></DesktopNavbar>
            <div className=""></div>
          </div>

          <div id="mobile-version-navbar" className="lg:hidden">
            <MobileNavbar className="py-3"></MobileNavbar>
            <SearchBar></SearchBar>
          </div>

          {children}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
