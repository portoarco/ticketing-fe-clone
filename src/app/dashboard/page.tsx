import MobileNavbar from "./components/Mobilenavbar";

import DesktopNavbar from "./components/DesktopNavbar";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";
import MainDashboardPage from "./maindashboard/page";

function Dashboard() {
  return (
    <section id="dashboard-page">
      <div
        id="container"
        className="flex flex-col lg:flex-row h-[100vh] lg:gap-x-5 lg:p-4 relative"
      >
        <div id="sidebar" className="max-lg:hidden  lg:basis-2/6 xl:basis-1/6 ">
          <Sidebar></Sidebar>
        </div>
        <div
          id="dashboard-content"
          className=" lg:basis-4/5 xl:basis-5/6 overflow-y-auto  max-lg:p-4 p-6  "
        >
          <div id="desktop-version-navbar" className="max-lg:hidden">
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
