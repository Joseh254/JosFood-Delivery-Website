import React, { useEffect, useState } from "react";
import { GrMenu } from "react-icons/gr";
import { useNavigate, useLocation } from "react-router-dom";
import useUserStore from "../../../Store/UserStore";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useUserStore((state) => state.user);
  const changeUserInformation = useUserStore((state) => state.changeUserInformation);

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

  const isLoginPage = location.pathname === "/Login";

  return (
    <header className="navigationbar">
      <div className="favdishes">
        <p>
          <GrMenu />
        </p>
        <h2>Uber Eats</h2>
      </div>

      <div className="loginandsignupbuttons">
        {signedIn && !isLoginPage ? (
          <>
            {isAdmin && (
              <button
                className="adminbutton"
                onClick={() => navigate("/AdminHome")}
              >
                Welcome back {user.firstName}
              </button>
            )}
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
