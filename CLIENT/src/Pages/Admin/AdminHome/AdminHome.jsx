import React from "react";
import "./AdminHome.css";
import useUserStore from "../../../../Store/UserStore";
import AdminHeader from "../../../Components/AdminHeader/AdminHeader";
function AdminHome() {
  const changeUserInformation = useUserStore((state) => state.user);
  return (
    <>
      <div>
        <AdminHeader />
      </div>
    </>
  );
}

export default AdminHome;
