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
import Cart from "../components/frontend/Cart";
import Checkout from "../components/frontend/Checkout";
// import FilterCategories from "../components/frontend/FilterCategories";

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
  { path: "/cart", element: <Cart /> },
  { path: "/checkout", element: <Checkout /> },

  { path: "/403", element: <Page403 /> },
  { path: "/404", element: <Page404 /> },
  { path: "/login", element: <Login /> },

  { path: "/register", element: <Register /> },

  { path: "/products/category/:category", element: <ViewProduct /> },
  { path: "/products/brand/:brand", element: <ViewProduct /> },
  {
    path: "/products/price/:minPrice/:maxPrice",
    element: <ViewProduct />,
  },
];

export default RoutesList;
