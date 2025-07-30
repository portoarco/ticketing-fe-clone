"use client";
import MobileNavbar from "./components/Mobilenavbar";
import DesktopNavbar from "./components/DesktopNavbar";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";
import MainDashboardPage from "./maindashboard/page";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { apiCall } from "@/helper/apiCall";

function Dashboard() {
  const route = useRouter();

  const getEvents = async () => {
    try {
      const getData = await apiCall.get("/events");
      console.log(getData);
    } catch (error) {
      console.log(error);
    }
  };

  // Route protection
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      route.replace("/login");
    }
  }, []);

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

          <MainDashboardPage />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
