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
import { AxiosError } from "axios";
import { useLoadingStore } from "@/store/loadingStore";
import LoadingPage from "@/app/components/LoadingPage";

interface DashboardProps {
  children: ReactNode;
}

function Dashboard({ children }: DashboardProps) {
  const route = useRouter();

  // const [loading, setLoading] = useState(true);
  const { isVerified } = useUserStore();
  // const [loading, setLoading] = useState(true);
  const { isLoading, setLoading } = useLoadingStore();

  // Route protection
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        route.replace("/login");
        return;
      }

      try {
        setLoading(true);
        const res = await apiCall.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data);
        setLoading(false);
      } catch (err) {
        const error = err as AxiosError;
        const status = error.response?.status;

        console.log(status);

        if (status === 403) {
          toast.error("Please verify your account first!");
          route.replace("/");
        } else if (status === 404) {
          toast.error("You have not been verified");
          route.replace("/");
        } else {
          toast.error("Session expired or error");
          localStorage.removeItem("token");
          console.log(status);
          route.replace("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [route, setLoading]);

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

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
