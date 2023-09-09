import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import MasterLayout from "./layouts/admin/MasterLayout";
import Dashboard from "./components/admin/Dashboard";
import Profile from "./components/admin/Profile";
import Login from "./components/frontend/auth/Login";
import Register from "./components/frontend/auth/Register";
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
  function RegistrationPage() {
    const navigate = useNavigate();
    // Check authentication status and handle redirection
    if (localStorage.getItem("auth_token")) {
      navigate("/");
      return null; // Redirecting, so nothing needs to be rendered here.
    } else {
      return <Register />;
    }
  }
  function LoginPage() {
    const navigate = useNavigate();
    // Check authentication status and handle redirection
    if (localStorage.getItem("auth_token")) {
      navigate("/");
      return null; // Redirecting, so nothing needs to be rendered here.
    } else {
      return <Login />;
    }
  }
  return (
    <BrowserRouter>
      <div className="App">
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
