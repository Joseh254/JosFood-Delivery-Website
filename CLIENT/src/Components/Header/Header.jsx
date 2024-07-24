import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import useUserStore from "../../../Store/UserStore";
import useCounterStore from "../../../Store/CounterStore";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useUserStore((state) => state.user);
  const changeUserInformation = useUserStore((state) => state.changeUserInformation);
  const cartCount = useCounterStore((state) => state.cartCount);
  const setCartCount = useCounterStore((state) => state.updateCartCount);

  const [isAdmin, setIsAdmin] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    if (user) {
      setSignedIn(true);
      setIsAdmin(user.role === "admin");
      
      // Fetch cart count for the logged-in user
      const fetchCartCount = async () => {

        if (!user || !user.id) {
          console.error('User ID is not defined');
          setError('User ID is not defined');
          return;
        }
        try {
          const response = await fetch(`http://localhost:3000/api/cart/getCart/${user.id}`, { 
            credentials: 'include' 
          });
          const data = await response.json();
          setCartCount(data.cartProduct.length);
        } catch (error) {
          console.error('Error fetching cart count:', error.message);
        }
      };

      fetchCartCount();
    } else {
      setSignedIn(false);
      setIsAdmin(false);
      setCartCount(0); 
    }
  }, [user, setCartCount]);

  const handleSignInToggle = () => {
    navigate("/Signup");
  };

  const handleLoginToggle = () => {
    navigate("/Login");
  };

  const handleLogout = () => {
    changeUserInformation(null);
    setSignedIn(false);
    setIsAdmin(false);
    setCartCount(0); 
    navigate("/Login");
  };

  function goToCart() {
    navigate("/Cart");
  }

  const isLoginPage = location.pathname === "/Login";

  return (
    <header className="navigationbar">
      <div className="favdishes">
        <Link to="/" className="homelink">
          <FaHome /> Home
        </Link>
        <h2>Jos <span>Food</span> Delivery</h2>
      </div>

      <div className="loginandsignupbuttons">
        {signedIn && !isLoginPage ? (
          <>
            {signedIn && (
              <button
                className="adminbutton"
                onClick={() => navigate("/AdminHome")}
              >
                Welcome  {user.firstName}
              </button>
            )}

            <button className="cartcounter" onClick={goToCart}>
              <FaShoppingCart />({cartCount})
            </button>
            <button id="logout" className="logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button id="login" className="loginlogout" onClick
={handleLoginToggle}>
              Login
            </button>
            <button id="signup" onClick={handleSignInToggle}>
              Signup
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;