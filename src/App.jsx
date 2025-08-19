import "./App.css";
import { HomePage } from "./pages/Home/HomePage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { Route, Routes } from "react-router";
import { OrdersPage } from "./pages/Orders/OrdersPage";
import { Tracking } from "./pages/Tracking";
import { NotFoundPage } from "./pages/NotFoundPage";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("/api/cart-items?expand=product").then((response) => {
      setCart(response.data);
    });
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="orders" element={<OrdersPage cart={cart} />} />
      <Route path="tracking" element={<Tracking />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
