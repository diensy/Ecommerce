import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSlidebar from "./Slidebar";
import AdminHeader from "./Header";

const AdminLayout = () => {
  const [openSidebar,setOpenSidebar] = useState(false)
  return (
    <>
      <div className="flex w-full min-h-screen">
        {/* Admin Slidebar */}
        <AdminSlidebar open={openSidebar} setOpen={setOpenSidebar}/>
        <div className="flex flex-1 flex-col ">
          {/* Admin Header */}
          <AdminHeader setOpen={setOpenSidebar}/>
          <main className="flex-1 flex-col flex bg-muted/40 p-4  md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
