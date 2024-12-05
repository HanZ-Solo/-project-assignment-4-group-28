import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeList from './pages/HomeList';
import ProductDetail from './pages/Detail';
import ShoppingCart from './pages/Cart';
import { CartProvider } from './context/CartContext'; // Import CartProvider

const App = () => {
  return (
    <CartProvider> {/* Wrap the entire application */}
      <Router>
        <Routes>
          <Route path="/" element={<HomeList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<ShoppingCart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
