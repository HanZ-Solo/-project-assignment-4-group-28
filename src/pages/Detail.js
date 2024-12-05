import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../components/css/style.css';
import logo from '../assets/image/logo.png';

const ProductDetail = () => {
  const { id } = useParams(); // Extract productId from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch product details:', err.message);
        setError('Failed to fetch product details');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => quantity > 1 && setQuantity((prev) => prev - 1);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>No product found</p>;

  return (
    <div className="power">
      {/* Header Section */}
      <div className="menu">
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
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Sign in</Link></li>
              <li><Link to="/cart">Cart</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Product Banner Section */}
      <div className="cartimg">
        <img src="https://via.placeholder.com/1200x300" alt="Banner" />
      </div>

      {/* Product Details Section */}
      <div className="product-detail">
        <img src={product.imageUrl} alt={product.name} />
        <div className="content">
          <h1>{product.name}</h1>
          <p>Price: ${product.price.toFixed(2)}</p>
          <p>Stock: {product.stock}</p>
          <p>Processor: {product.specifications.processor}</p>
          <p>RAM: {product.specifications.ram}</p>
          <p>Storage: {product.specifications.storage}</p>
          <p>Operating System: {product.specifications.os}</p>
          <p>Category: {product.category}</p>
          <p>Brand: {product.brand}</p>
          <p>Release Date: {product.releaseDate}</p>
          <div className="quantity-control">
            Qty:
            <button onClick={handleDecrement} disabled={quantity <= 1}>-</button>
            <span>{quantity}</span>
            <button onClick={handleIncrement}>+</button>
          </div>
          <Link to="/cart">
          <button className="addcart">Add to Cart</button>
          </Link>
          <Link to="/pay">
            <button className="buynow">Buy Now</button>
          </Link>
        </div>
        <div className="detail">
          <p>Detail</p>
          <img src={product.imageUrl} alt="Detail" />
        </div>
      </div>

      {/* Footer Section */}
      <div className="foot">
        <p>Welcome to the computer store</p>
        <p>2024 The website copyright belongs to the author</p>
      </div>
    </div>
  );
};

export default ProductDetail;
