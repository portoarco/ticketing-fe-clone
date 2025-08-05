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
