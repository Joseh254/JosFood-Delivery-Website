import React, { useState } from 'react';
import { useFormik } from "formik";
import axios from "axios";
import useUserStore from '../../../../Store/UserStore';
import "./AddProduct.css"; 

function AddProduct() {
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
          "http://localhost:3000/api/products/createProduct",
          values,
          { withCredentials: true }
        );
      
        if (response.data.success === true) {
          setMessage("Product Added to Database")
          formik.resetForm();
        } else {
          setError("Failed to add product. Please try again.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setError("You do not have permission to add a product.");
    }
  };

  const formik = useFormik({
    initialValues: {
      productName: "",
      productPrice: "",
      productDescription: "",
      productImage: "",
    },
    onSubmit: handleSubmit,
    validate: (values) => {
      let errors = {};
      if (!values.productName) errors.productName = "Product name is required";
      if (!values.productPrice) errors.productPrice = "Product price is required";
      if (!values.productDescription) errors.productDescription = "Product description is required";
      if (!values.productImage) errors.productImage = "Product image is required";
      return errors;
    },
  });

  return (
    <div className='addProductContainer'>
      <h1>Add Products To Database</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="AddProducts">
          <label>Product Name</label>
          <input
            type="text"
            placeholder=" Enter Product Name"
            name="productName"
            value={formik.values.productName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.productName && formik.errors.productName && (
            <p>{formik.errors.productName}</p>
          )}
        </div>

        <div className="AddProducts">
          <label>Product Price</label>
          <input
            type="number"
            placeholder=" Enter Product Price"
            name="productPrice"
            value={formik.values.productPrice}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.productPrice && formik.errors.productPrice && (
            <p>{formik.errors.productPrice}</p>
          )}
        </div>

        <div className="AddProducts">
          <label>Product Description</label>
          <input
            type="text"
            placeholder="Enter Product Description"
            name="productDescription"
            value={formik.values.productDescription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.productDescription && formik.errors.productDescription && (
            <p>{formik.errors.productDescription}</p>
          )}
        </div>

        <div className="AddProducts">
          <label>Product Image URL</label>
          <input
            type="text"
            placeholder="Enter Product Image URL:"
            name="productImage"
            value={formik.values.productImage}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.productImage && formik.errors.productImage && (
            <p>{formik.errors.productImage}</p>
          )}
        </div>

        {error && <p className="error">{error}</p>}
        
        <button type="submit" className="AddProductbtn" disabled={loading}>
          {loading ? "Please wait..." : "Add product"}
        </button>
        <p className='addedToDbMessage'>{message}</p>
      </form>
      
    </div>
  );
}

export default AddProduct;
