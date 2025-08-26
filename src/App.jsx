import "./App.css";
import { HomePage } from "./pages/Home/HomePage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { Route, Routes } from "react-router";
import { OrdersPage } from "./pages/Orders/OrdersPage";
import { Tracking } from "./pages/Tracking";
import { NotFoundPage } from "./pages/NotFoundPage";
import { useState, useEffect } from "react";
import axios from "axios";

window.axios =axios;

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async ()=>{
    const response = await axios.get("/api/cart-items?expand=product");
      setCart(response.data);
  };

  useEffect(() => {

    loadCart();


  }, []);

  return (
    <Routes>
      <Route index element={<HomePage loadCart={loadCart} cart={cart} />} />
      <Route path="checkout" element={<CheckoutPage loadCart={loadCart} cart={cart} />} />
      <Route path="orders" element={<OrdersPage cart={cart} loadCart={loadCart} />} />
      <Route path="tracking/:orderId/:productId" element={<Tracking cart={cart} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
