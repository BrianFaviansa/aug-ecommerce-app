import { createBrowserRouter, RouterProvider } from "react-router-dom";

//* Component
import AboutView from "./pages/AboutView";
import CartView from "./pages/CartView";
import HomeView from "./pages/HomeView";
import OrderView from "./pages/OrderView";
import ProductView from "./pages/ProductView";
import LoginView from "./pages/auth/LoginView";
import RegisterView from "./pages/auth/RegisterView";
import PublicLayout from "./layouts/PublicLayout";
import DetailProduct from "./pages/DetailProduct";

//* Loader
import { loader as HomeLoader } from "./pages/HomeView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <HomeView />,
        loader: HomeLoader,
      },
      {
        path: "products",
        element: <ProductView />,
      },
      {
        path: "products/:id",
        element: <DetailProduct />,
      },
      {
        path: "orders",
        element: <OrderView />,
      },
      {
        path: "cart",
        element: <CartView />,
      },
      {
        path: "about",
        element: <AboutView />,
      },
      {
        path: "/products",
        element: <ProductView />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginView />,
  },
  {
    path: "/register",
    element: <RegisterView />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
