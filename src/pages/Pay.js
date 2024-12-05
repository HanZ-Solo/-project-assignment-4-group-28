import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const handlePayment = () => {
    // Simulate order details
    const orderId = `ORD-${Math.floor(Math.random() * 1000000)}`;
    const orderDetails = {
      orderId,
      items: cartItems,
      subtotal,
      tax,
      total,
      date: new Date().toLocaleString(),
    };
  
    // Save order details (Simulated Backend Storage)
    localStorage.setItem('lastOrder', JSON.stringify(orderDetails));
  
    // Clear the cart
    localStorage.removeItem('cart');
  
    // Construct the email content
    const emailContent = {
      subject: 'Order Confirmation',
      body: `Thank you for your purchase! 
  Order ID: ${orderDetails.orderId}
  Date: ${orderDetails.date}
  Total: $${total.toFixed(2)}
  Items:
  ${orderDetails.items
    .map((item) => `- ${item.name} x ${item.quantity} @ $${item.price.toFixed(2)}`)
    .join('\n')}`,
    };
  
    // Notify the user
    alert(`Email Sent:\nSubject: ${emailContent.subject}\n\n${emailContent.body}`);
  
    // Redirect to the homepage
    navigate('/');
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

        {/* Payment Button */}
        <button className="proceed-button" onClick={handlePayment}>
          Pay Now
        </button>
      </main>

      <footer className="foot">
        <p>Welcome to the computer store</p>
        <p>2024 The website copyright belongs to the author</p>
      </footer>
    </div>
  );
};

export default Pay;
