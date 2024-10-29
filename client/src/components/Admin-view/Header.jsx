import React from "react";
import { Button } from "../ui/button";
import { AlignJustify, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux/auth-slice";

const AdminHeader = ({ setOpen }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <>
      <header className="flex items-center px-4 py-3 bg-background border-b">
        <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
          <AlignJustify />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <div className="flex flex-1 justify-end ">
          <Button
            onClick={handleLogout}
            className="inline-flex gap-2 rounded-md items-center px-4 py-2 text-md font-medium shadow-md shadow-slate-700"
          >
            <LogOut />
            Logout
          </Button>
        </div>
      </header>
    </>
  );
};

export default AdminHeader;
