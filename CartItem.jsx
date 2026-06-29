import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './App.css';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all items in the cart
  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Calculate total number of items for the cart icon
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Handle incrementing item quantity
  const handleIncrement = (id) => {
    dispatch(updateQuantity({ id, amount: 1 }));
  };

  // Handle decrementing item quantity, remove if quantity becomes 0
  const handleDecrement = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(updateQuantity({ id, amount: -1 }));
    } else {
      dispatch(removeItem(id));
    }
  };

  // Handle removing item completely from cart
  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-brand">Paradise Nursery</div>
        <div className="nav-links">
          {/* Thêm đầy đủ 3 links như bên ProductList */}
          <a href="/">Home</a>
          <a href="#" onClick={onContinueShopping}>Plants</a>
          <a href="#">Cart 🛒 <span className="cart-count">{totalItems}</span></a>
        </div>
      </nav>

      <div className="cart-container">
        <h2 className="total-cart-amount">Total Cart Amount: ${totalAmount.toFixed(2)}</h2>
        
        <div className="cart-items">
          {cartItems.map(item => (
            // Thêm đầy đủ classNames theo chuẩn e-commerce
            <div key={item.id} className="cart-item">
              <div className="cart-item-image" style={{height:'50px', width:'50px', background:'#ccc', display: 'inline-block'}}></div>
              
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-cost">Unit Price: ${item.price}</p>
                <p className="cart-item-subtotal">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              
              <div className="cart-item-actions">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item.id, item.quantity)}>-</button>
                <span className="cart-item-quantity">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item.id)}>+</button>
                <button className="cart-item-delete" onClick={() => handleRemove(item.id)} style={{marginLeft: '10px', color: 'red'}}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary-actions">
          <button className="continue-shopping-btn" onClick={onContinueShopping}>Continue Shopping</button>
          <button className="checkout-btn" onClick={() => alert('Coming Soon')}>Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
