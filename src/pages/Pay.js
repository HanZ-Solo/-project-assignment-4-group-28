import React, { useState } from 'react';
import '../components/css/style.css';
import logo from '../assets/image/logo.png';
const PaymentPage = () => {

  const product = {
    id: 1,
    name: 'Lenovo IdeaPad Slim 3 Consumer Laptop 15.6" AMD Ryzen 5 7520U 16GB 512GB SSD Windows 11 Home, 82XQ00BECC',
    description: 'I have to give the IdeaPad Slim 3 a 5 star rating because of the price at Canada Computers which was at the time 210CDN less than most other places I checked online!',
    price: 99.99,
    stock: 100,
  };

 
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product.price);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const calculateTotalPrice = (qty) => {
    const price = qty * product.price;
    setTotalPrice(price.toFixed(2)); 
  };


  const handleQuantityChange = (e) => {
    const qty = parseInt(e.target.value, 10);
    if (qty > 0 && qty <= product.stock) {
      setQuantity(qty);
      calculateTotalPrice(qty);
    } else {
      alert('Please enter a valid quantity.');
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
   
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Payment successful! Thank you for your purchase.');
      
    }, 2000); 
  };

  return (
    <div className='pw'>
      
      <div className='menu'>
            <div className='menucenter'>
                <div className='menus'>
                    <img src={logo}></img>
                </div>
                <div className='menus'>
                    <input></input>
                    <button>Search</button>
                </div>
                <div className='menus'>
                    <ul>
                        <li><a href='/'>Home</a></li>
                        <li><a href='/login'>Sign in</a></li>
                        <li><a href='/cart'>Cart</a></li>
                    </ul>
                </div>
            </div>
   </div>

   <div className='cartimg'>
      <img src={require('../assets/image/00.jpg')} alt="Logo" />
      </div>


    <div className="payment-page">
      <h1>Product Payment Page</h1>
      <div className="product-details">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>Price: ${product.price.toFixed(2)}</p>
        <p>Stock: {product.stock}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="quantity-selector">
          <label>
            Quantity:
            <input
              type="number"
              value={quantity}
              min="1"
              max={product.stock}
              onChange={handleQuantityChange}
            />
          </label>
        </div>
        <div className="total-price">
          <p>Total Price: ${totalPrice}</p>
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Processing...' : 'Submit Payment'}
        </button>
      </form>
    </div>

    <div className='foot'>
        <p>Welcome to the computer store</p>
        <p>2024 The website copyright belongs to the author</p>
     </div>
    </div>
  );
};

export default PaymentPage;