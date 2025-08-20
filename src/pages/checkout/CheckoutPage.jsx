import "./Checkoutpage.css";
import { CheckoutHeader } from "./CheckoutHeader";
import axios from "axios";
import { useState, useEffect } from "react";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";

export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async()=>{
      let response = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime"
      );

        setDeliveryOptions(response.data);

        response = await axios.get("/api/payment-summary");
        setPaymentSummary(response.data);
    };
    fetchCheckoutData();
  }, [cart]);

  return (
    <>
      <title>Checkout</title>
      <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />
      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary loadCart={loadCart} cart={cart} deliveryOptions={deliveryOptions} />

          <PaymentSummary loadCart={loadCart} paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}
