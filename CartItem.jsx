import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './App.css';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleIncrement = (id) => {
    dispatch(updateQuantity({ id, amount: 1 }));
  };

  const handleDecrement = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(updateQuantity({ id, amount: -1 }));
    } else {
      dispatch(removeItem(id));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-brand">Paradise Nursery</div>
        <div className="nav-links">
          <a href="#" onClick={onContinueShopping}>Plants</a>
          <a href="#">Cart 🛒 <span className="cart-count">{totalItems}</span></a>
        </div>
      </nav>

      <div className="cart-container">
        <h2>Total Cart Amount: ${totalAmount.toFixed(2)}</h2>
        
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item-card">
              <div className="placeholder-img" style={{height:'50px', width:'50px', background:'#ccc'}}></div>
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>Unit Price: ${item.price}</p>
                <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <div className="item-actions">
                <button onClick={() => handleDecrement(item.id, item.quantity)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrement(item.id)}>+</button>
                <button onClick={() => handleRemove(item.id)} style={{marginLeft: '10px', color: 'red'}}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary-actions">
          <button onClick={onContinueShopping}>Continue Shopping</button>
          <button onClick={() => alert('Coming Soon')}>Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
