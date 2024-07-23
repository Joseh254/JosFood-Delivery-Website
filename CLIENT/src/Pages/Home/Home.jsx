import React, { useEffect, useState } from "react";
import TypingAnimator from "react-typing-animator";
import axios from "axios";
import { api_url } from "../../../utills/config";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(
          `${api_url}/api/products/getAllproducts`,
        );
        console.log(response);
        setProducts(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading please wait...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const textArray = ["near you", "Call Us on", "+254768163608"];
  const animation = (
    <TypingAnimator
      textArray={textArray}
      cursorColor="red"
      textColor="red"
      fontSize="2rem"
      loop
      typingSpeed={60}
      delaySpeed={1000}
      backspace
      height="60px"
    />
  );
  return (
    <>
      <div className="herocontainer">
        <div className="heroheading">
          <h1>Order delivery:{animation} </h1>
        </div>

        <div className="heroinputs">
          <input type="text" placeholder="Enter delivery address " />
          <select>
            <option value="Deliver Now">Deliver Now</option>
            <option value="Deliver Now">Order Delivery</option>
            <option value="Deliver Now">Cancel Delivery</option>
          </select>
          <button>Find Food</button>
        </div>
      </div>

      <section className="products">
        {products.map((product) => (
          <div className="productscontainer" key={product.id}>
            <img src={product.productImage} alt={product.productImage} />
            <h1>{product.productName}</h1>
            <p>{product.productDescription}</p>
            <p>
              <strike>Was Ksh{product.productPrice + 100}</strike>
            </p>
            <p className="pricenow">Now Ksh{product.productPrice}</p>
         <Link to='/Login'>   <button>Add to Cart</button></Link>
          </div>
        ))}
      </section>
    </>
  );
}

export default Home;
