import Footer from "../../layouts/admin/Footer";
import Navbar from "../../layouts/admin/Navbar";
import Sidebar from "../../layouts/admin/Sidebar";

const Dashboard = () => {
  return (
    <>
      <div className="sb-nav-fixed">
        <Navbar />

        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <Sidebar />
          </div>
          <div id="layoutSidenav_content">
            <main> dashboard</main>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
