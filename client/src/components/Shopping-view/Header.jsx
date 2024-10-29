import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/redux/auth-slice";
import CartWrapper from "./CartWrapper";
import { fetchCartItems } from "@/redux/shop/Cart";
import { Label } from "../ui/label";

function MenuItems() {
  const navigate = useNavigate();
  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilters =
      getCurrentMenuItem.id !== "home"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;
    sessionStorage.setItem("filters", JSON.stringify(currentFilters));
    navigate(getCurrentMenuItem.path);
  }
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((MenuItems) => (
        <Label
          onClick={() => handleNavigate(MenuItems)}
          className="text-small font-medium cursor-pointer"
          key={MenuItems.id}
        >
          {MenuItems.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.auth);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handelLogout() {
    dispatch(logoutUser());
  }
  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch, user?.id]);

  const totalQuantity =
    cartItems?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => {
            setOpenCartSheet(true);
          }}
          variant="outline"
          size="icon"
        >
          <ShoppingCart className="h-6 w-6" />
          {totalQuantity > 0 && (
            <span className="absolute  lg:top-2 lg:right-20  bg-red-500 text-white rounded-full px-1 text-xs">
              {totalQuantity}
            </span>
          )}
          <span className="sr-only">User Cart</span>
        </Button>
        <CartWrapper
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback
              className="text-white font-extrabold cursor-pointer"
              style={{
                background:
                  "linear-gradient(163deg, rgba(206,3,208,1) 1%, rgba(9,119,121,1) 59%, rgba(0,212,255,1) 100%)",
              }}
            >
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" className="w-56">
          <DropdownMenuLabel>Hello {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigate("/shop/account")}
            className="cursor-pointer"
          >
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handelLogout} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const ShoppingHeader = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  console.log(user, "user");
  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <Link to="/shop/home">
            <HousePlug className="h-6 w-6 " />
            <span className="font-bold">Ecommerce</span>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6 " />
                <span className="sr-only">Toggle dheader menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs">
              <MenuItems />
              <HeaderRightContent />
            </SheetContent>
          </Sheet>
          <div className="hidden lg:block">
            <MenuItems />
          </div>

          <div className="lg:block hidden">
            <HeaderRightContent />
          </div>
        </div>
      </header>
    </>
  );
};

export default ShoppingHeader;
