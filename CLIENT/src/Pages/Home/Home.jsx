import React, { useEffect, useState } from "react";
import TypingAnimator from "react-typing-animator";
import axios from "axios";
import { api_url } from "../../../utills/config";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import useUserStore from "../../../Store/UserStore";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartProduct, setCartProduct] = useState(null)
  const navigate = Navigate
  const user = useUserStore((state)=>state.user)
  useEffect(() => {

 async function fetchCartProducts(){
if (user){
  try {
    const response = axios.get(`${api_url}/api/cart/getCart/${user.userid}`,{ withCredentials: true });
    console.log(response);
    setCartProduct(response.data)
  } catch (error) {
    setError(error.message)
  }
}
};

    async function fetchProducts() {
      try {
        const response = await axios.get(
          `${api_url}/api/products/getAllproducts`,
        );
        setProducts(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchProducts();
    fetchCartProducts();
  }, [user]);


  async function handleAddCart(){
    if(!user){
alert("Please log in to add products to the cart");

return;
    }
    if(cartProduct.some(product=>product.productid ===products.id)){
      alert("This product already in your cart.");
      return;
    }
    try {
      const cartProduct = {
        userid: user.id,
        productid: products.id,
      };

      const response =  await axios.post("http://localhost:3000/api/cart/createCart",cartProduct,{ withCredentials: true });
      setCartProduct([...cartProduct, response.data]);
      updateCartCount(cartProduct.length +1);
      showNotification('Product added to cart')
    } catch (error) {
      console.log(error);
      setError("there was an error getting your cart")
    }
  }


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
          <button onClick={()=>handleAddCart(product)}>Add to Cart</button>
          </div>
        ))}
      </section>
    </>
  );
}

export default Home;
