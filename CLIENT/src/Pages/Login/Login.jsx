import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { api_url } from "../../../utills/config";
import useUserStore from "../../../Store/UserStore";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const changeUserInformation = useUserStore((state) => state.changeUserInformation);

  async function handleSubmit(formState) {
    try {
      setLoading(true);
      setError("");
      const response = await axios.post(`${api_url}/api/users/login`, formState);
      console.log(response);
      const data = response.data;
      console.log(data.data.role);
      if(data.success ===true){
        if (data.data.role === "admin") {
          changeUserInformation(data.user); 
          navigate("/AdminHome");
        } else {
          navigate("/")
        }
      }else{
        setError(error.message)
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleSubmit,
    validate: function (formValues) {
      let errors = {};
      if (formValues.email === "") errors.email = "Email is required";
      if (formValues.password === "") errors.password = "Please enter a password";
      return errors;
    },
  });

  return (
    <section className="loginsection">
      <div className="loginpage">
        <form onSubmit={formik.handleSubmit}>
          <div className="">
            <h1>Log in to your account</h1>
            <p>
              Don't have an account? <Link to="/Signup">Create Account</Link>
            </p>

            <div className="logininputs">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Your email address"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.email && formik.errors.email && (
                <p className="loginerror">{formik.errors.email}</p>
              )}
            </div>

            <div className="logininputs">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Your password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.password && formik.errors.password && (
                <p className="loginerror">{formik.errors.password}</p>
              )}

              <p>
                Forgot your password? <Link to="/">Reset Password</Link>
              </p>
              {error && <p className="loginerror">{error}</p>}
              <button type="submit" disabled={loading}>
                {loading ? "Please wait..." : "Log in"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
