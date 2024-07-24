import React, { useState, useEffect } from "react";
import "./AdminProducts.css";
import { api_url } from "../../../../utills/config";
import axios from "axios";
import useUserStore from "../../../../Store/UserStore";
import AdminHeader from "../../../Components/AdminHeader/AdminHeader";
import { Link } from "react-router-dom";
import {  useNavigate } from 'react-router-dom';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  
  useEffect(() => {
    async function fetchProducts() {
      if (user) {
        try {
          const response = await axios.get(`${api_url}/api/products/getAllproducts`, { withCredentials: true });
          setProducts(response.data.data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      } else {
        setError("404 - Page Not Found");
        navigate("/Page404");
        setLoading(false);
      }
    }

    fetchProducts();
  }, [user]);

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`${api_url}/api/products/deleteproduct/${productId}`, { withCredentials: true });
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Failed to delete product. Please try again later.");
    }
  };

  if (loading) {
    return <p>Loading, please wait...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <AdminHeader />
      <section className="Adminproducts">
        {products.map((product) => (
          <div className="Adminproductscontainer" key={product.id}>
            <img src={product.productImage} alt={product.productName} />
            <h1>{product.productName}</h1>
            <p>{product.productDescription}</p>
            <p className="pricenow">Price Ksh {product.productPrice}</p>

            <div className="adminoperationButtons">
              <Link to={`/EditProduct/${product.id}`}>
                <button className="editbtn">Edit</button>
              </Link>
              <button
                className="delbtn"
                onClick={() => deleteProduct(product.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <Link to="/AddProduct">
          <button className="addProductbtn">+</button>
        </Link>
      </section>
    </>
  );
}

export default AdminProducts;
