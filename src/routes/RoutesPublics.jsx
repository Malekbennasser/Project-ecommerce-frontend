import Home from "../components/frontend/Home";
import Contact from "../components/frontend/Contact";
import About from "../components/frontend/About";
import Page403 from "../components/errors/Page403";
import Page404 from "../components/errors/Page404";
import Login from "../components/frontend/auth/Login";
import Register from "../components/frontend/auth/Register";
import ViewCategory from "../components/frontend/collections/ViewCategory";
import ViewProduct from "../components/frontend/collections/ViewProduct";
import ProductDetail from "../components/frontend/collections/ProductDetail";

const RoutesList = [
  { path: "/", name: "home", element: <Home /> },
  { path: "/contact", element: <Contact /> },
  { path: "/about", element: <About /> },
  { path: "/collections", element: <ViewCategory /> },
  { path: "/collections/:product_slug", element: <ViewProduct /> },
  {
    path: "/collections/:category_slug/:product_slug",
    element: <ProductDetail />,
  },

  { path: "/403", element: <Page403 /> },
  { path: "/404", element: <Page404 /> },
  { path: "/login", element: <Login /> },

  { path: "/register", element: <Register /> },
];

export default RoutesList;
