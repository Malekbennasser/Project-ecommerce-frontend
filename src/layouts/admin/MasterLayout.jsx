// import Navbar from "./Navbar";
// import "../../assets/admin/css/styles.css";
// import "../../assets/admin/js/scripts";
// import Sidebar from "./Sidebar";
// import Footer from "./Footer";

// const MasterLayout = () => {
//   return (
//     <div className="sb-nav-fixed">
//       <Navbar />

//       <div id="layoutSidenav">
//         <div id="layoutSidenav_nav">
//           <Sidebar />
//         </div>
//         <div id="layoutSidenav_content">
//           <main></main>
//           <Footer />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MasterLayout;

import Navbar from "./Navbar";
import "../../assets/admin/css/styles.css";
import "../../assets/admin/js/scripts";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Dashboard from "../../components/admin/Dashboard";
import Profile from "../../components/admin/Profile";
import { Route, Routes } from "react-router-dom";
import Category from "../../components/admin/category/Category";
import ViewCategory from "../../components/admin/category/ViewCategory";
import EditCategory from "../../components/admin/category/EditCategory";
import AddProduct from "../../components/admin/product/AddProduct";
import ViewProduct from "../../components/admin/product/ViewProduct";
import EditProduct from "../../components/admin/product/EditProduct";
import Orders from "../../components/admin/Orders/Orders";

const MasterLayout = () => {
  return (
    <div className="sb-nav-fixed">
      <Navbar />

      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar />
        </div>
        <div id="layoutSidenav_content">
          <main>
            <Routes>
              <Route path="/admin" element={<MasterLayout />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/category" element={<Category />} />
              <Route path="/admin/view-category" element={<ViewCategory />} />
              <Route
                path="/admin/edit-category/:id"
                element={<EditCategory />}
              />
              <Route path="/admin/add-product" element={<AddProduct />} />
              <Route path="/admin/view-product" element={<ViewProduct />} />
              <Route path="/admin/edit-product/:id" element={<EditProduct />} />
              <Route path="/admin/profile" element={<Profile />} />
              <Route path="/admin/ordres" element={<Orders />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
