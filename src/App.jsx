import { BrowserRouter, Route, Routes } from "react-router-dom";
import MasterLayout from "./layouts/admin/MasterLayout";
import Dashboard from "./components/admin/Dashboard";
import Profile from "./components/admin/Profile";

// import Home from "./components/frontend/Home";
import axios from "axios";
import AdminPrivateRoute from "./AdminPrivateRoute";
// import Page403 from "./components/errors/Page403";
// import Page404 from "./components/errors/Page404";
import Category from "./components/admin/category/Category";
import ViewCategory from "./components/admin/category/ViewCategory";
import EditCategory from "./components/admin/category/EditCategory";
import AddProduct from "./components/admin/product/AddProduct";
import ViewProduct from "./components/admin/product/ViewProduct";
import EditProduct from "./components/admin/product/EditProduct";
// import About from "./components/frontend/About";
// import Contact from "./components/frontend/Contact";

import FrontendLayout from "./layouts/frontend/FrontendLayout";
import RoutesList from "./routes/RoutesPublics";
import Orders from "./components/admin/Orders/Orders";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post["Content-type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

function App() {
  // function RegistrationPage() {
  //   const navigate = useNavigate();

  //   if (localStorage.getItem("auth_token")) {
  //     navigate("/");
  //     return null;
  //     return <Register />;
  //   }
  // }
  // function LoginPage() {
  //   const navigate = useNavigate();

  //   if (localStorage.getItem("auth_token")) {
  //     navigate("/");
  //     return null;
  //   } else {
  //     return <Login />;
  //   }
  // }
  return (
    <BrowserRouter>
      <div className="App bg-body-tertiary">
        <Routes>
          {/* <Route path="/403" element={<Page403 />} />
          <Route path="/404" element={<Page404 />} /> */}

          {/* <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
          {/* <Route
            element={
              <PublicRoute>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </PublicRoute>
            }
          /> */}
          {/* {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))} */}

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

          {/* <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<RegistrationPage />} /> */}

          <Route element={<AdminPrivateRoute />}>
            <Route path="/admin/*" element={<MasterLayout />} />
          </Route>
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
            <Route path="/admin/view-product" element={<ViewProduct />} exact />
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
