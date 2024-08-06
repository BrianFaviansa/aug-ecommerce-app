import { createBrowserRouter, RouterProvider } from "react-router-dom";

//* Component
import AboutView from './pages/AboutView';
import CartView from './pages/CartView';
import HomeView from './pages/HomeView';
import OrderView from './pages/OrderView';
import ProductView from './pages/ProductView';
import LoginView from './pages/auth/LoginView';
import RegisterView from './pages/auth/RegisterView';
import PublicLayout from "./layouts/PublicLayout";

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <button className="btn btn-active btn-primary">Primary</button>
      <button className="btn btn-active btn-secondary">Secondary</button>
    </>
  );
}

export default App;
