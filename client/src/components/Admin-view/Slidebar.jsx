import { BaggageClaim, LayoutDashboard, ShoppingCart } from "lucide-react";
import { MdAdminPanelSettings } from "react-icons/md";
import { MdFeaturedPlayList } from "react-icons/md";

import React from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebar = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icons: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icons: <ShoppingCart />,
  },
  {
    id: "order",
    label: "Orders",
    path: "/admin/orders",
    icons: <BaggageClaim />,
  },
  {
    id: "features",
    label: "Features",
    path: "/admin/features",
    icons: <MdFeaturedPlayList />,
  },
];

function MenuItems() {
  const navigate = useNavigate();
  return (
    <nav className="flex flex-col mt-8 gap-2">
      {adminSidebar.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => navigate(menuItem.path)}
          className="flex items-center gap-2 text-lg font-semibold cursor-pointer rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground duration-500"
        >
          {menuItem.icons}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

const AdminSlidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader>
              <SheetTitle className="flex gap-2">
                <MdAdminPanelSettings size={30} />
                <span>Admin Pannel</span>
              </SheetTitle>
            </SheetHeader>
            <MenuItems />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 border-r flex-col bg-background p-6 lg:flex">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/admin/dashboard")}
        >
          <MdAdminPanelSettings size={30} />
          <h1 className="text-2xl font-extrabold">Admin Pannel</h1>
        </div>
        <MenuItems />
      </aside>
    </>
  );
};

export default AdminSlidebar;
