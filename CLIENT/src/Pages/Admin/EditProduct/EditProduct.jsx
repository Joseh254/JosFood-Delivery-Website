import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminHeader from '../../../Components/AdminHeader/AdminHeader';
import useUserStore from '../../../../Store/UserStore';
import { api_url } from '../../../../utills/config';
import './EditProduct.css';

function EditProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const user = useUserStore((state) => state.user);

  const formik = useFormik({
    initialValues: {
      productName: "",
      productPrice: "",
      productDescription: "",
      productImage: "",
    },
    onSubmit: handleSubmit
  });

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${api_url}/api/products/getOneproduct/${productId}`, { withCredentials: true });
      console.log(response);
      if (response.data.success) {
        formik.setValues(response.data.data);
      } else {
        setError("Failed to fetch product data.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  async function handleSubmit(values) {
    if (user.role === "admin") {
      try {
        setLoading(true);
        setError("");
        const response = await axios.patch(`${api_url}/api/products/updateproduct/${productId}`, values, { withCredentials: true });
        if (response.data.success) {
          setMessage("Product updated successfully");
          formik.resetForm();
          navigate('/AdminProducts'); // Redirect to AdminProducts after updating
        } else {
          setError("Failed to update product. Please try again.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setError("You do not have permission to edit a product.");
    }
  }

  return (
    <>
      <AdminHeader />
      <div className='addProductContainer'>
        <h1>Update Product</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="AddProducts">
            <label>Product Name</label>
            <input
              type="text"
              placeholder="Enter Product Name"
              name="productName"
              value={formik.values.productName}
              onChange={formik.handleChange}
            />
          </div>

          <div className="AddProducts">
            <label>Product Price</label>
            <input
              type="number"
              placeholder="Enter Product Price"
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
              placeholder="Enter Product Image URL"
              name="productImage"
              value={formik.values.productImage}
              onChange={formik.handleChange}
            />
          </div>

          {error && <p className="error">{error}</p>}
          <button type="submit" className="AddProductbtn" disabled={loading}>
            {loading ? "Please wait..." : "Update Product"}
          </button>
          <p className='addedToDbMessage'>{message}</p>
        </form>
      </div>
    </>
  );
}

export default EditProduct;
