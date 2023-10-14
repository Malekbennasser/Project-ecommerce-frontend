import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./components/admin/Dashboard";
import Profile from "./components/admin/Profile";

import AdminPrivateRoute from "./AdminPrivateRoute";

import Category from "./components/admin/category/Category";
import ViewCategory from "./components/admin/category/ViewCategory";
import EditCategory from "./components/admin/category/EditCategory";
import AddProduct from "./components/admin/product/AddProduct";
import ViewProduct from "./components/admin/product/ViewProduct";
import EditProduct from "./components/admin/product/EditProduct";
import Orders from "./components/admin/Orders/Orders";
import FrontendLayout from "./layouts/frontend/FrontendLayout";
import RoutesList from "./routes/RoutesPublics";
import MasterLayout from "./layouts/admin/MasterLayout";

function App() {
  return (
    <BrowserRouter>
      <div className="App bg-body-tertiary">
        <Routes>
          <Route
            path="*"
            element={
              <FrontendLayout>
                <Routes>
                  {RoutesList.map((route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      element={route.element}
                    />
                  ))}
                </Routes>
              </FrontendLayout>
            }
          />

          <Route element={<AdminPrivateRoute />}>
            <Route path="/admin/*" element={<MasterLayout />}></Route>
            <Route element={<AdminPrivateRoute />}>
              <Route
                path="/admin/dashboard"
                name="Admin"
                element={<Dashboard />}
                exact
              />
            </Route>
            <Route element={<AdminPrivateRoute />}>
              <Route path="/admin/profile" element={<Profile />} exact />
            </Route>
            <Route element={<AdminPrivateRoute />}>
              <Route path="/admin/category" element={<Category />} exact />
            </Route>
            <Route element={<AdminPrivateRoute />}>
              <Route
                path="/admin/view-category"
                element={<ViewCategory />}
                exact
              />
            </Route>
            <Route element={<AdminPrivateRoute />}>
              <Route
                path="/admin/edit-category/:id"
                element={<EditCategory />}
                exact
              />
            </Route>
            <Route element={<AdminPrivateRoute />}>
              <Route path="/admin/add-product" element={<AddProduct />} exact />
            </Route>
            <Route element={<AdminPrivateRoute />}>
              <Route
                path="/admin/view-product"
                element={<ViewProduct />}
                exact
              />
            </Route>

            <Route element={<AdminPrivateRoute />}>
              <Route
                path="/admin/edit-product/:id"
                element={<EditProduct />}
                exact
              />
            </Route>

            <Route element={<AdminPrivateRoute />}>
              <Route path="/admin/ordres" element={<Orders />} exact />
            </Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
