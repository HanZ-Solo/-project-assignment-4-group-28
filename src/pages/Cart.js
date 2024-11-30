
import React, { useState, useEffect } from 'react';
import logo from '../assets/image/logo.png';
import '../components/css/style.css';


const initialProducts = [
  { id: 1, name: 'Product 1', price: 100, quantity: 1 },
  { id: 2, name: 'Product 2', price: 200, quantity: 2 },
  
];

const ShoppingCart = () => {
  const [products, setProducts] = useState(initialProducts);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calcTotal = () => products.reduce((sum, product) => sum + product.price * product.quantity, 0);
    setTotal(calcTotal());
  }, [products]);

  
  const handleQuantityChange = (id, quantity) => {
    setProducts(prevProducts => prevProducts.map(product =>
      product.id === id ? { ...product, quantity } : product
    ));
  };

  
  const renderCartItems = () => (
    <ul className="cart-list">
      {products.map(product => (
        <li key={product.id} className="cart-item">
          <img src={require('../assets/image/tsdl.jpg')}></img>
          <span className="product-name">{product.name}</span>
          <span className="product-price">${product.price}</span>
          <input
            type="number"
            value={product.quantity}
            min="1"
            onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value, 10))}
          />
        </li>
      ))}
    </ul>
  );

  return (

    <div>

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

    <div className="shopping-cart">
        
      <h1>Shopping Cart</h1>
      
      {renderCartItems()}
      <div className="total">
        <span>Total: ${total.toFixed(2)}</span>
        <button className='btn'>settlement</button>
      </div>
    </div>

     <div className='foot'>
        <p>Welcome to the computer store</p>
        <p>2024 The website copyright belongs to the author</p>
     </div>
    </div>
  );
};

export default ShoppingCart;