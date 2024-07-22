import React from 'react'
import "./EditProduct.css"
import { useFormik } from "formik";
import AdminHeader from '../../../Components/AdminHeader/AdminHeader'
import useUserStore from '../../../../Store/UserStore';
import { useState } from 'react';
import { api_url } from '../../../../utills/config';
import axios from 'axios';

function EditProduct() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage]= useState("")
    const user = useUserStore((state) => state.user);
  
    const handleSubmit = async (values) => {
      console.log(user.role);
      if (user.role === "admin") {
        try {
          setLoading(true);
          setError("");
          const response = await axios.post(
            `${api_url}/api/products/updateproduct/${productId}, { withCredentials: true `,
            values,
            { withCredentials: true }
          );
        
          if (response.data.success === true) {
            setMessage("Product updated succesfuly")
            formik.resetForm();
          } else {
            setError("Failed to Update product. Please try again.");
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      } else {
        setError("You do not have permission to Edit a product.");
      }
    };
  
    const formik = useFormik({
      initialValues: {
        productName: "",
        productPrice: "",
        productDescription: "",
        productImage: "",
      },
      onSubmit: handleSubmit
    });
  
    return (
      <>
      <AdminHeader/>
      <div className='addProductContainer'>
        <h1>Update Product</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="AddProducts">
            <label>Product Name</label>
            <input
              type="text"
              placeholder=" Enter Product Name"
              name="productName"
              value={formik.values.productName}
              onChange={formik.handleChange}
              
              
            />
          </div>
  
          <div className="AddProducts">
            <label>Product Price</label>
            <input
              type="number"
              placeholder=" Enter Product Price"
              name="productPrice"
              value={formik.values.productPrice}
              onChange={formik.handleChange}
  
            />

          </div>
  
          <div className="AddProducts">
            <label>Product Description</label>
            <input
              type="text"
              placeholder="Enter Product Description"
              name="productDescription"
              value={formik.values.productDescription}
              onChange={formik.handleChange}

            />

          </div>
  
          <div className="AddProducts">
            <label>Product Image URL</label>
            <input
              type="text"
              placeholder="Enter Product Image URL:"
              name="productImage"
              value={formik.values.productImage}
              onChange={formik.handleChange}

            />

          </div>
  
          {error && <p className="error">{error}</p>}
          
          <button type="submit" className="AddProductbtn" disabled={loading}>
            {loading ? "Please wait..." : "Update product"}
          </button>
          <p className='addedToDbMessage'>{message}</p>
        </form>
        
      </div>
      </>
    );}

export default EditProduct