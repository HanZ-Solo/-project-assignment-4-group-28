import React, { useState, useRef, useEffect } from 'react';
import image0 from '../assets/image/slider_bg01.jpg';
import image1 from '../assets/image/slider_bg02.jpg';
import image2 from '../assets/image/slider_bg03.jpg';
import logo from '../assets/image/logo.png';
import tsdl from '../assets/image/tsdl.jpg';
import '../components/css/style.css';

const HomeList = () => {
  const initialData = [
    { id: 1, name: 'Lenovo desktop computer', image: require('../assets/image/tsdl.jpg'),price:'2000',costprice:'6000' },
    { id: 2, name: 'Lenovo desktop computer', image: require('../assets/image/01.png'),price:'1800',costprice:'3000' },
    { id: 3, name: 'Lenovo desktop computer', image: require('../assets/image/02.png'),price:'5000',costprice:'8000' },
    { id: 4, name: 'Lenovo desktop computer', image: require('../assets/image/03.png'),price:'6000',costprice:'10000' },
    { id: 5, name: 'Lenovo desktop computer', image: require('../assets/image/04.jpg'),price:'23000',costprice:'30000' },
    { id: 6, name: 'Lenovo desktop computer', image: require('../assets/image/05.jpg'),price:'9000',costprice:'12000' },
    { id: 7, name: 'Lenovo desktop computer', image: require('../assets/image/06.jpg'),price:'3500',costprice:'5000' },
    { id: 8, name: 'Lenovo desktop computer', image: require('../assets/image/07.png'),price:'2000',costprice:'6000' },
    { id: 9, name: 'Lenovo desktop computer', image: require('../assets/image/08.jpg'),price:'6500',costprice:'8000' },
    { id: 10, name: 'Lenovo desktop computer', image: require('../assets/image/09.png'),price:'5000',costprice:'7000' },
  ];

  const [data, setData] = useState(initialData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const carouselRef = useRef(null);

  

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const images = [image0, image1, image2];

  const handleDotClick = (index) => {
    clearInterval(intervalRef.current);
    setCurrentIndex(index);
    setTimeout(() => {
      startAutoPlay();
    }, 300); 
  };

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
  };


  const activeImageClass = (index) => index === currentIndex ? 'active' : '';

  return (
    <div className='power'>
      <div className='menu'>
        <div className='menucenter'>
          <div className='menus'>
            <img src={logo} alt="Logo" />
          </div>
          <div className='menus'>
            <input type="text" placeholder="Search..." />
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
      <div className="carousel-container">
        <div className="carousel-slide" ref={carouselRef}>
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Carousel Image ${index + 1}`}
              className={`carousel-image ${activeImageClass(index)}`}
            />
          ))}
        </div>
        <div className="carousel-dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`carousel-dot ${activeImageClass(index)}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
      <div className='productlist'>
        <ul>
          {data.map(item => (
            


            <li key={item.id}>
                <a href={`/product/${item.id}`}>
                    <img src={item.image}></img>
                    <div>
                        <p>{item.name}</p>
                        <p>${item.price} <span>${item.costprice}</span></p>
                    </div>
                </a>
            </li>
           
          ))}
        </ul>
        
      </div>
      
      <div className='fts'>
        <p>Welcome to the computer store</p>
        <p>2024 The website copyright belongs to the author</p>
      </div>
    </div>
  );
};

export default HomeList;