import { DeliveryOptions } from "./DeliveryOptions";
import { CartItemDetails } from "./CartItemDetails";
import { DeliveryDate } from "./DeliveryDate";
import axios from "axios";

export function OrderSummary({ cart, deliveryOptions, loadCart }) {
  const deleteCartItem = async (productId) => {
    await axios.delete(`/api/cart-items/${productId}`);
    await loadCart();
  };

  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => (
          <div key={cartItem.productId} className="cart-item-container">
            <DeliveryDate
              cartItem={cartItem}
              deliveryOptions={deliveryOptions}
            />
            <div className="cart-item-details-grid">
              <CartItemDetails
                cartItem={cartItem}
                deleteCartItem={deleteCartItem} // ✅ pass handler
              />
              <DeliveryOptions
                loadCart={loadCart}
                cartItem={cartItem}
                deliveryOptions={deliveryOptions}
              />
            </div>
          </div>
        ))}
    </div>
  );
}
