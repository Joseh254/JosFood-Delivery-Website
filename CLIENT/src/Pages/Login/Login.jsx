import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import { api_url } from "../../../utills/config";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(formState) {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(`${api_url}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
        credentials: "include",
      });

      const data = await response.json();
      if (data.success === true) {
        navigate("/AdminHome");
      } else {
        setError(data.message || "Login failed");
      }
      console.log(data);
      console.log(response);
    } catch (error) {
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      firstname: "",
      email: "",
      password: "",
    },
    onSubmit: handleSubmit,
    validate: function (formValues) {
      let errors = {};
      if (formValues.firstname === "")
        errors.firstname = "First name is required";
      if (formValues.email === "") errors.email = "Email is required";
      if (formValues.password === "")
        errors.password = "Please enter a password";
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
              Dont have an account? <Link to="/Signup">Create Account</Link>
            </p>
            <div className="logininputs">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                placeholder="First name"
                name="firstname"
                value={formik.values.firstname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.firstname && formik.errors.firstname && (
                <p>{formik.errors.firstname}</p>
              )}
            </div>

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
                <p>{formik.errors.email}</p>
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
                {loading ? "Logging in..." : "Log in"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
