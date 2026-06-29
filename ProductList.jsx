import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './App.css';

// SỬA LỖI: Cập nhật đủ 18 cây (6 cây/danh mục x 3 danh mục)
const plantsData = [
  // Danh mục 1: Succulents
  { id: 1, name: 'Aloe Vera', price: 15, category: 'Succulents', image: 'url1' },
  { id: 2, name: 'Snake Plant', price: 20, category: 'Succulents', image: 'url2' },
  { id: 3, name: 'Jade Plant', price: 18, category: 'Succulents', image: 'url3' },
  { id: 4, name: 'Echeveria', price: 12, category: 'Succulents', image: 'url4' },
  { id: 5, name: 'Zebra Plant', price: 14, category: 'Succulents', image: 'url5' },
  { id: 6, name: 'Burros Tail', price: 22, category: 'Succulents', image: 'url6' },
  
  // Danh mục 2: Flowering
  { id: 7, name: 'Peace Lily', price: 25, category: 'Flowering', image: 'url7' },
  { id: 8, name: 'Orchid', price: 30, category: 'Flowering', image: 'url8' },
  { id: 9, name: 'African Violet', price: 15, category: 'Flowering', image: 'url9' },
  { id: 10, name: 'Bromeliad', price: 28, category: 'Flowering', image: 'url10' },
  { id: 11, name: 'Anthurium', price: 35, category: 'Flowering', image: 'url11' },
  { id: 12, name: 'Christmas Cactus', price: 20, category: 'Flowering', image: 'url12' },
  
  // Danh mục 3: Trees
  { id: 13, name: 'Fiddle Leaf Fig', price: 45, category: 'Trees', image: 'url13' },
  { id: 14, name: 'Rubber Plant', price: 40, category: 'Trees', image: 'url14' },
  { id: 15, name: 'Money Tree', price: 35, category: 'Trees', image: 'url15' },
  { id: 16, name: 'Weeping Fig', price: 50, category: 'Trees', image: 'url16' },
  { id: 17, name: 'Majesty Palm', price: 55, category: 'Trees', image: 'url17' },
  { id: 18, name: 'Parlor Palm', price: 30, category: 'Trees', image: 'url18' }
];

function ProductList() {
  const [viewCart, setViewCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isAdded = (plantId) => {
    return cartItems.some(item => item.id === plantId);
  };

  if (viewCart) {
    return <CartItem onContinueShopping={() => setViewCart(false)} />;
  }

  const categories = [...new Set(plantsData.map(plant => plant.category))];

  return (
    <div>
      <nav className="navbar">
        <div className="nav-brand">Paradise Nursery</div>
        <div className="nav-links">
          {/* SỬA LỖI: Thêm link Home (refresh trang hoặc dùng the <a> thông thường) */}
          <a href="/" className="nav-link">Home</a>
          <a href="#" onClick={() => setViewCart(false)} className="nav-link">Plants</a>
          <a href="#" onClick={() => setViewCart(true)} className="nav-link">
            Cart 🛒 <span className="cart-count">{totalCartItems}</span>
          </a>
        </div>
      </nav>

      <div className="product-listing">
        {categories.map(category => (
          <div key={category} className="category-section">
            <h2>{category}</h2>
            <div className="plant-grid">
              {plantsData.filter(p => p.category === category).map(plant => (
                <div key={plant.id} className="plant-card">
                  <div className="placeholder-img" style={{height:'100px', background:'#ccc'}}>[Thumbnail]</div>
                  <h3>{plant.name}</h3>
                  <p>${plant.price}</p>
                  <button 
                    disabled={isAdded(plant.id)}
                    onClick={() => handleAddToCart(plant)}
                  >
                    {isAdded(plant.id) ? "Added to Cart" : "Add to Cart"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
