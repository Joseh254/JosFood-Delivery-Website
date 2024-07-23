import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css';

function Cart({ user, toggleCartPopup, updateCartCount }) {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (user) {
        try {
          const response = await axios.get(`http://localhost:3000/api/cart/getCart/${user.id}`);
          setCartProducts(response.data);
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      }
    };

    fetchCartItems();
  }, [user]);

  const handleDeleteFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/cart/removeCart/${productId}`);
      const updatedCartProducts = cartProducts.filter(product => product.id !== productId);
      setCartProducts(updatedCartProducts);
      updateCartCount(updatedCartProducts.length); // Update cart count in the navbar
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  const calculateTotal = () => {
    return cartProducts.reduce((total, product) => total + parseFloat(product.products.productPrice), 0).toFixed(2);
  };

  return (
    <div className='cart-popup'>
      <div className='cart-popup-inner'>
        <button className='close-btn' onClick={toggleCartPopup}>X</button>
        <h2>Shopping Cart</h2>
        <div className='cart-items'>
          {cartProducts.map(product => (
            <div key={product.id} className='cart-item'>
              <p>{product.products.productName}</p>
              <p>${product.products.productPrice}</p>
              <button onClick={() => handleDeleteFromCart(product.id)}>Remove</button>
            </div>
          ))}
        </div>
        <div className='cart-total'>
          <p>Total: ${calculateTotal()}</p>
        </div>
        <button className='checkout-btn'>Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
