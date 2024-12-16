import React from "react";
import img from "../../assets/account.jpg";
import Address from "@/components/Shopping-view/Address";
import { useSelector } from "react-redux";
import CartContain from "@/components/Shopping-view/CartContain";
import { Button } from "@/components/ui/button";
import axios from "axios";
const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const totalAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce((sum, currentItem) => {
          const itemPrice =
            currentItem?.saleprice > 0
              ? currentItem?.saleprice
              : currentItem?.price;
          const itemQuantity = currentItem.quantity || 0;
          return sum + itemPrice * itemQuantity;
        }, 0)
      : 0;

  return (
    <>
      <div className="flex flex-col ">
        <div className="relative h-[300px] w-full overflow-hidden">
          <img
            src={img}
            alt=""
            className="h-full w-full object-cover object-center "
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-3 p-5">
          <Address />
          <div className="flex flex-col gap-7 ml-5 ">
            {cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items.map((items) => (
                  <CartContain cartItems={items} />
                ))
              : null}
            <div className="mt-8 space-y-4">
              <div className="flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold">₹{totalAmount}</span>
              </div>
            </div>
            <div className="mt-5 w-full">
              <Button className="w-full">Checkout with PayPal</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCheckout;
