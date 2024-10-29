import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import CartContain from "./CartContain";
import axios from "axios";

const CartWrapper = ({ cartItems }) => {
  const totalAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce((sum, currentItem) => {
          const itemPrice =
            currentItem?.saleprice > 0
              ? currentItem?.saleprice
              : currentItem?.price;
          const itemQuantity = currentItem.quantity || 0;
          return sum + itemPrice * itemQuantity;
        }, 0)
      : 0;

  const handleCheckout = async () => {
    try {
      const response = await axios.post("http://localhost:5000/checkout", {
        items: cartItems,
      });

      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };
  return (
    <>
      <SheetContent className=" sm:max-w-md">
        <SheetHeader>
          <SheetTitle
            style={{ textShadow: "2px 4px 4px rgba(100, 50, 50, 0.5)" }}
          >
            <span className="text-2xl font-bold">
              Your Cart <ShoppingCart className="inline ml-3" />
            </span>
          </SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-4">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item,index) => <CartContain key={index}  cartItems={item} />)
          ) : (
            <p>Your Cart is Empty</p>
          )}
        </div>
        <div className="mt-8 space-y-4">
          <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">₹{totalAmount}</span>
          </div>
        </div>
        <Button onClick={handleCheckout} className="w-full">
          Checkout
        </Button>
      </SheetContent>
    </>
  );
};

export default CartWrapper;
