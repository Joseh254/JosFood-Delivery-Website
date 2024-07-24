import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useUserStore from '../../../Store/UserStore';
import useCounterStore from '../../../Store/CounterStore';
import './Cart.css';
 
function Cart({ toggleCartPopup }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = useUserStore((state) => state.user);
  const setCartCount = useCounterStore((state) => state.updateCartCount);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (user && user.id) {
        console.log('Fetching cart items for user:', user.id);
        try {
          const response = await axios.get(`http://localhost:3000/api/cart/getCart/${user.id}`, { withCredentials: true });
          console.log('Cart Items Response:', response.data.cartProduct);
          setCartProducts(response.data.cartProduct || []);
          setCartCount(response.data.cartProduct.length);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching cart items:', error.message);
          setError('Error fetching cart items');
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [user, setCartCount]);

  const handleDeleteFromCart = async (productId) => {
    try {
      console.log('Deleting cart item with ID:', productId);
      await axios.delete(`http://localhost:3000/api/cart/removeCart/${productId}`, { withCredentials: true });
      const updatedCartProducts = cartProducts.filter(product => product.id !== productId);
      setCartProducts(updatedCartProducts);
      setCartCount(updatedCartProducts.length); 
    } catch (error) {
      console.error('Error deleting cart item:', error.message);
      setError('Error deleting cart item');
    }
  };

  const calculateTotal = () => {
    return cartProducts.reduce((total, product) => total + parseFloat(product.product.productPrice), 0).toFixed(2);
  };

  if (loading) {
    return <div className='cart-popup'><p>Loading...</p></div>;
  }

  if (error) {
    return <div className='cart-popup'><p>{error}</p></div>;
  }

  return (
    <div className='cart-popup'>
      <div className='cart-popup-inner'>
        <button className='close-btn' onClick={toggleCartPopup}>X</button>
        <h2>Shopping Cart</h2>
        {cartProducts.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <div className='cart-items'>
              {cartProducts.map(product => (
                <div key={product.id} className='cart-item'>
                  <p>{product.product.productName}</p>
                  <p>Ksh {product.product.productPrice}</p>
                  <button onClick={() => handleDeleteFromCart(product.id)}>Remove</button>
                </div>
              ))}
            </div>
            <div className='cart-total'>
              <p>Total: Ksh {calculateTotal()}</p>
            </div>
            <button className='checkout-btn'>Checkout</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
