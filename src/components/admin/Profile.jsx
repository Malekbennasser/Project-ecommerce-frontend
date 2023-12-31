import Footer from "../../layouts/admin/Footer";
import Navbar from "../../layouts/admin/Navbar";
import Sidebar from "../../layouts/admin/Sidebar";

const Profile = () => {
  return (
    <div>
      <Navbar />

      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar />
        </div>
        <div id="layoutSidenav_content">
          <main>
            <h1>profile</h1>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Profile;
