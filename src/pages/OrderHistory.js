import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.token) {
          setError('User not logged in');
          return;
        }

        // Decode the userId from the token
        const decodedToken = jwtDecode(user.token);
        const userId = decodedToken.userId;

        if (!userId) {
          setError('Invalid user ID');
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/orders/${userId}`);
        const ordersData = response.data;
        setOrders(ordersData);

        // Fetch product details for all items in orders
        const productIds = [...new Set(ordersData.flatMap((order) => order.items.map((item) => item.productId)))];
        const productDetails = await Promise.all(
          productIds.map(async (productId) => {
            const productResponse = await axios.get(`http://localhost:5000/api/products/${productId}`);
            return { productId, ...productResponse.data };
          })
        );

        // Create a map of productId to product details
        const productMap = productDetails.reduce((acc, product) => {
          acc[product.productId] = product;
          return acc;
        }, {});

        setProducts(productMap);
      } catch (err) {
        console.error('Error fetching orders or products:', err);
        setError('Failed to fetch order history.');
      }
    };

    fetchOrders();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="order-history">
      <h1>Order History</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.orderId}>
              <p>Order ID: {order.orderId}</p>
              <p>Status: {order.status}</p>
              <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
              <p>Timestamp: {new Date(order.timestamp).toLocaleString()}</p>
              <h3>Items:</h3>
              <ul>
                {order.items.map((item, index) => {
                  const product = products[item.productId];
                  return (
                    <li key={index}>
                      {product ? (
                        <div>
                          <p>Product Name: {product.name}</p>
                          <p>Brand: {product.brand}</p>
                          <p>Price: ${product.price.toFixed(2)}</p>
                          <p>Quantity: {item.quantity}</p>
                        </div>
                      ) : (
                        <p>Loading product details...</p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
