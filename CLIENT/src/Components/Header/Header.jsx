import React, { useState } from 'react';
import { GrMenu } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import "./Header.css"

function Header() {
    const [signedIn, setSignedIn] = useState(false);
    const [loading, setLoading] =useState(false)
    const navigate = useNavigate()

    const handleSignInToggle = () => {
        setSignedIn(!signedIn);
        if(signedIn){
            setLoading(false)
            navigate("/Login")
        }else{
            setLoading(true)
        }
    };

    return (
        <header className='navigationbar'>
            <div className="favdishes">
               
                    <p><GrMenu/></p>
                    <h2>Uber Eats</h2>
            </div>

            <div className="loginandsignupbuttons">
                <button id='login'
                 onClick={handleSignInToggle} className='loginlogout'>
                {signedIn ? "Logout" : "Login"}
                </button>

                <button id='signup'
                onClick={handleSignInToggle}
                >{signedIn ?  "":"Signup"}</button>
            </div>

        </header>
    );
}

export default Header;
