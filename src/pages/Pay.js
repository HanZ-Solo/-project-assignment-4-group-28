import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';
import logo from '../assets/image/logo.png';
import '../components/css/style.css';

const Pay = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const TAX_RATE = 0.13; // Example tax rate: 13%

  useEffect(() => {
    // Retrieve cart items from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);

    // Calculate subtotal, tax, and total
    const subtotalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const taxAmount = subtotalAmount * TAX_RATE;
    const totalAmount = subtotalAmount + taxAmount;

    setSubtotal(subtotalAmount);
    setTax(taxAmount);
    setTotal(totalAmount);
  }, []);

  const handlePaymentSuccess = async (token) => {
    const orderId = `ORD-${Math.floor(Math.random() * 1000000)}`;
    const orderDetails = {
      orderId,
      items: cartItems,
      subtotal,
      tax,
      total,
      date: new Date().toLocaleString(),
    };

    // Prepare stock update payload
    const stockUpdates = cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    try {
      // Update stock on backend
      await fetch('http://localhost:5000/api/products/update-stock', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: stockUpdates }),
      });

      // Save order details locally
      localStorage.setItem('lastOrder', JSON.stringify(orderDetails));

      // Clear the cart
      localStorage.removeItem('cart');

      // Notify user
      alert(`Payment successful! Order ID: ${orderId}`);

      // Redirect to homepage
      navigate('/');
    } catch (error) {
      console.error('Error during payment process:', error);
      alert('Failed to complete the transaction. Please try again.');
    }
  };

  return (
    <div className="payment-container">
      <header className="menu">
        <div className="menucenter">
          <div className="menus">
            <img src={logo} alt="Logo" />
          </div>
          <div className="menus">
            <input type="text" placeholder="Search..." />
            <button>Search</button>
          </div>
          <div className="menus">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/cart">Cart</a></li>
            </ul>
          </div>
        </div>
      </header>

      <main className="payment-content">
        <h1>Checkout and Payment</h1>

        {/* Order Summary */}
        <h2>Order Summary</h2>
        <ul className="order-list">
          {cartItems.map((item) => (
            <li key={item.productId} className="order-item">
              <span className="item-name">{item.name}</span>
              <span className="item-quantity">x {item.quantity}</span>
              <span className="item-price">${item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
        <h3>Tax (13%): ${tax.toFixed(2)}</h3>
        <h2>Total: ${total.toFixed(2)}</h2>

        {/* Square Payment Form */}
        {/* Card Number	Card, Type,	Expiration Date,	CVV,	ZIP Code */}
        {/* 4111 1111 1111 1111,	Visa,	Any future date,	111,	11111 */}
        <PaymentForm
          applicationId="sandbox-sq0idb-Cl80p-EJaW8gfX0SMY8YGg"
          locationId="EAAAluFHLDIaIOctiROSDozj1MmbbV4ZH23iTnLkNn6GduBuE7fe0GMiLENyG2R6"
          cardTokenizeResponseReceived={(token) => {
            handlePaymentSuccess(token);
          }}
          createPaymentRequest={() => ({
            country: 'US',
            currency: 'USD',
            total: {
              amount: total.toFixed(2),
              label: 'Total',
            },
          })}
        >
          <CreditCard />
        </PaymentForm>
      </main>

      <footer className="foot">
        <p>Welcome to the computer store</p>
        <p>2024 The website copyright belongs to the author</p>
      </footer>
    </div>
  );
};

export default Pay;
