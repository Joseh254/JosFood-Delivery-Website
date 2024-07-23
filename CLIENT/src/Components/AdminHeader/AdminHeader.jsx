import React from "react";
import "./AdminHeader.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
function AdminHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink 
            to="/"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/AdminProducts"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Products
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/AdminOrders"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            View Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/AdminUsers"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            View Users
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
export default AdminHeader;
