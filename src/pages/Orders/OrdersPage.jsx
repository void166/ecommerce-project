import { Header } from "../../components/Header";
import "./OrdersPage.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { OrdersGrid } from "./OrdersGrid";

export function OrdersPage({ cart }) {
  const [orders, SetOrders] = useState([]);

  useEffect(() => {
    const fetchOrdersData = async ()=>{

     const response = await axios.get("/api/orders?expand=products");
      SetOrders(response.data);
    }
    fetchOrdersData();

  }, []);

  return (
    <>
      <title>Orders</title>
      <link rel="icon" type="image/png" href="/orders-favicon.png" />

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

      <OrdersGrid orders={orders} />
      </div>
    </>
  );
}
