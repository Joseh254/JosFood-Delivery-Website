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
    } else {
      setSignedIn(false);
      setIsAdmin(false);
    }
  }, [user]);

  useEffect(() => {
    // Fetch cart count from local storage
    const fetchCartCountFromLocalStorage = () => {
      const count = localStorage.getItem('cartCount');
      if (count) {
        setCartCount(Number(count));
      }
    };

    fetchCartCountFromLocalStorage();
  }, [setCartCount]);

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
            {isAdmin && signedIn && (
              <button
                className="adminbutton"
                onClick={() => navigate("/AdminHome")}
              >
                Welcome back {user.firstName}
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
            <button id="login" className="loginlogout" onClick={handleLoginToggle}>
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
