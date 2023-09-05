import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import MasterLayout from "./layouts/admin/MasterLayout";
import Dashboard from "./components/admin/Dashboard";
import Profile from "./components/admin/Profile";
import Login from "./components/frontend/auth/Login";
import Register from "./components/frontend/auth/Register";
import Home from "./components/frontend/Home";
import axios from "axios";
import AdminPrivateRoute from "./AdminPrivateRoute";
import Page403 from "./components/errors/Page403";
import Page404 from "./components/errors/Page404";
import Category from "./components/admin/category/Category";
import ViewCategory from "./components/admin/category/ViewCategory";
import EditCategory from "./components/admin/category/EditCategory";
import AddProduct from "./components/admin/product/AddProduct";

// import Dashboard from "./components/admin/Dashboard";
// import Profile from "./components/admin/Profile";

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
          <Route path="/403" element={<Page403 />} />
          <Route path="/404" element={<Page404 />} />

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<RegistrationPage />} />

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

{
  /* <Route
            path="/admin"
            name="Admin"
            render={(props) => <MasterLayout {...props} />}
          /> */
}
{
  /* <Route exact path="/admin/dashboard" Component={Dashbord} /> */
}
{
  /* <Route exact path="/admin/profile" Component={Profile} /> */
}
{
  /* <Route path="/admin" element={<MasterLayout />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/profile" element={<Profile />} /> */
}

{
  /* <Route path="/login" element={<Login />} /> */
}
{
  /* <Route path="/register" element={<Register />} /> */
}

{
  /* <Route path="/login">
            {localStorage.getItem("auth_token") ? navigate("/") : <Login />}
          </Route>
          <Route path="/register">
            {localStorage.getItem("auth_token") ? navigate("/") : <Register />}
          </Route> */
}
{
  /* <Route path="/admin/*" element={<MasterLayout />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/profile" element={<Profile />} /> */
}
