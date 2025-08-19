import { Header } from "../components/Header";
import "./OrdersPage.css";
import { Link } from "react-router";
import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import dayjs from "dayjs";
import { formatMoney } from "../utils/money";

export function OrdersPage({ cart }) {
  const [orders, SetOrders] = useState([]);

  useEffect(() => {
    axios.get("/api/orders?expand=products").then((response) => {
      SetOrders(response.data);
    });
  }, []);

  return (
    <>
      <title>Orders</title>
      <link rel="icon" type="image/png" href="/orders-favicon.png" />

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => {
            return (
              <div key={order.id} className="order-container">
                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>{dayjs(order.orderTimeMs).format("MMMM D")}</div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>{formatMoney(order.totalCostCents)}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                  </div>
                </div>

                <div className="order-details-grid">
                  {order.products.map((OrderProduct) => {
                    return (
                      <Fragment key={OrderProduct.product.id}>
                        <div className="product-image-container">
                          <img src={OrderProduct.product.image} />
                        </div>

                        <div className="product-details">
                          <div className="product-name">
                            {OrderProduct.product.name}
                          </div>
                          <div className="product-delivery-date">
                            Arriving on: {dayjs(OrderProduct.estimatedDeliveryTimeMs).format('MMMM d')}
                          </div>
                          <div className="product-quantity">Quantity: {OrderProduct.quantity}</div>
                          <button className="buy-again-button button-primary">
                            <img
                              className="buy-again-icon"
                              src="images/icons/buy-again.png"
                            />
                            <span className="buy-again-message">
                              Add to Cart
                            </span>
                          </button>
                        </div>

                        <div className="product-actions">
                          <Link to="/tracking">
                            <button className="track-package-button button-secondary">
                              Track package
                            </button>
                          </Link>
                        </div>
                      </Fragment>
                    );
                  })}
                  <div className="product-image-container">
                    <img src="images/products/athletic-cotton-socks-6-pairs.jpg" />
                  </div>

                  <div className="product-details">
                    <div className="product-name">
                      Black and Gray Athletic Cotton Socks - 6 Pairs
                    </div>
                    <div className="product-delivery-date">
                      Arriving on: August 15
                    </div>
                    <div className="product-quantity">Quantity: 1</div>
                    <button className="buy-again-button button-primary">
                      <img
                        className="buy-again-icon"
                        src="images/icons/buy-again.png"
                      />
                      <span className="buy-again-message">Add to Cart</span>
                    </button>
                  </div>

                  <div className="product-actions">
                    <Link to="/tracking">
                      <button className="track-package-button button-secondary">
                        Track package
                      </button>
                    </Link>
                  </div>

                  <div className="product-image-container">
                    <img src="images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg" />
                  </div>

                  <div className="product-details">
                    <div className="product-name">
                      Adults Plain Cotton T-Shirt - 2 Pack
                    </div>
                    <div className="product-delivery-date">
                      Arriving on: August 19
                    </div>
                    <div className="product-quantity">Quantity: 2</div>
                    <button className="buy-again-button button-primary">
                      <img
                        className="buy-again-icon"
                        src="images/icons/buy-again.png"
                      />
                      <span className="buy-again-message">Add to Cart</span>
                    </button>
                  </div>

                  <div className="product-actions">
                    <Link to="/tracking">
                      <button className="track-package-button button-secondary">
                        Track package
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
