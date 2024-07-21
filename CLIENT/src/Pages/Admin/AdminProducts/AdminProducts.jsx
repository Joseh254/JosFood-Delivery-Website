import React from "react";
import "./AdminProducts.css";
import { useState, useEffect } from "react";
import { api_url } from "../../../../utills/config";
import axios from "axios";
import useUserStore from "../../../../Store/UserStore";
import AdminHeader from "../../../Components/AdminHeader/AdminHeader";
function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useUserStore((state)=>state.user)

  useEffect(() => {
    async function fetchProducts() {
      try {
        if (user){
          const response = await axios.get(
            `${api_url}/api/products/getAllproducts`
            ,{ withCredentials: true }
          );
          setProducts(response.data.data);
          setLoading(false);
        }
        else{
          setError("you are not logged in")
        }
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



  async function deleteProduct(){
    const response = await axios.delete("http://localhost:3000/api/products/deleteproduct")
    console.log(response);
  }
  return (
    <>
    <AdminHeader/>
      <section className="Adminproducts">
        {products.map((product) => (
          <div className="Adminproductscontainer" key={product.id}>
            <img src={product.productImage} alt={product.productImage} />
            <h1>{product.productName}</h1>
            <p>{product.productDescription}</p>
            <p className="pricenow">Price Ksh{product.productPrice}</p>

            <div className="adminoperationButtons">
              <button className="editbtn">Edit</button>
              <button
               className="delbtn"
               onClick={deleteProduct}
               >Delete</button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export default AdminProducts;
