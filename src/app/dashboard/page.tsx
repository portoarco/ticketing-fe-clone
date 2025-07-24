import MobileNavbar from "./components/Mobilenavbar";

import DesktopNavbar from "./components/DesktopNavbar";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";

function Dashboard() {
  return (
    <section id="dashboard-page">
      <div
        id="container"
        className="flex flex-col lg:flex-row h-[100vh] lg:gap-x-5 lg:p-4 relative"
      >
        <div id="sidebar" className="max-lg:hidden md:basis-1/6 ">
          <Sidebar></Sidebar>
        </div>
        <div
          id="dashboard-content"
          className="lg:basis-5/6 overflow-y-auto  max-lg:p-4  "
        >
          <div id="desktop-version" className="max-lg:hidden">
            <DesktopNavbar></DesktopNavbar>
            <div className=""></div>
          </div>

          <div id="mobile-version" className="lg:hidden">
            <MobileNavbar className="py-3"></MobileNavbar>
            <SearchBar></SearchBar>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
