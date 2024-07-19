import React from "react";
import { useFormik } from "formik";

function Login() {
  function handleSubmit() {}
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleSubmit,
  });
  return (
    <>
      <form></form>
    </>
  );
}

export default Login;
