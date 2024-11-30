// src/App.js

import '../components/css/style.css';
import logo from '../assets/image/logo.png';
import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';





const fetchProductDetail = (productId) => {
 
  return {
    id: productId,
    name: 'HP Pavilion Laptop 16" OLED Intel Ultra 5 125U 16GB 512GB SSD Windows 11 Home, A9FY2UA#ABL',
    model: 'iMac 2020',
    category:'Destop',
    manufacturer:'Apple',
    specifications:'Intel Core i9,32GB RAM, 1TB SSD',
    address:'cupertino, California, UsA',
    releaseDate:'2020-08-04',
    stock:100,
    price: 199.99,
    imageUrl: require('../assets/image/BJB.png'),
    detailimg:require('../assets/image/1.png'),
  };
};

const ProductDetail = () => {

    const [quantity, setQuantity] = useState(1); 

    const handleIncrement = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
      };
      const handleDecrement = () => {
        if (quantity > 1) {
          setQuantity(prevQuantity => prevQuantity - 1);
        }
      };

    
  const { id } = useParams(); 
  const product = fetchProductDetail(parseInt(id)); 

  return (
    
<div className='power'>

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
    <div className="product-detail">
      <img src={product.imageUrl} alt={product.name} />
      <div className='content'>
      <h1>{product.name}</h1>
      
      <p>price: ${product.price.toFixed(2)}<span>$699.9</span></p>
      <p>stock:{product.stock}</p>
      <p>model:{product.model} &nbsp; category:{product.category}&nbsp;&nbsp;manufacturer:{product.manufacturer}</p>
      <p>specifications:{product.specifications}</p>
      <p>address:{product.address}</p>
      <p>releaseDate:{product.releaseDate}</p>
      <div className="quantity-control">
      Qty:
        <button onClick={handleDecrement} disabled={quantity <= 1}>-</button>
        <span>{quantity}</span>
        <button onClick={handleIncrement}>+</button>
      </div>
      <Link to="/cart">
      <button className='addcart'>Add to cart</button>
      </Link>
      <Link to="/pay">
      <button className='buynow'>Buy Now</button>
      </Link>
      </div>
      <div className='detail'>
        <p>Detail</p>
        <img src={product.detailimg}></img>
      </div>
      
    </div>

    <div className='foot'>
        <p>Welcome to the computer store</p>
        <p>2024 The website copyright belongs to the author</p>
     </div>
</div>
    
  );
};

export default ProductDetail;