// "use client";
// import MobileNavbar from "./components/Mobilenavbar";
// import DesktopNavbar from "./components/DesktopNavbar";
// import SearchBar from "./components/SearchBar";
// import Sidebar from "./components/Sidebar";
// import { useRouter } from "next/navigation";
// import { ReactNode, useEffect } from "react";
// import MainDashboardPage from "./overview-dashboard/page";
// import ManageEvents from "./eventspage/page";

import Dashboard from "./components/DashboardLayout";
import MainDashboardPage from "./overview-dashboard/page";

function MainDashboard() {
  return (
    <section>
      <Dashboard>
        <MainDashboardPage></MainDashboardPage>
      </Dashboard>
    </section>
  );
}

export default MainDashboard;
