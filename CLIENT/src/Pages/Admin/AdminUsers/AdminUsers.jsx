import React from "react";
import axios from "axios";
import "./AdminUsers.css";
import AdminHeader from "../../../Components/AdminHeader/AdminHeader";
async function AdminUsers() {
  const response = await axios.get("http://localhost:3000/api/users/users");
  console.log(response);
  return <div>
    <AdminHeader/>
  </div>;
}

export default AdminUsers;
