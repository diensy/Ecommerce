import { Minus, Plus, Trash } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItems, updateCartItems } from "@/redux/shop/Cart";
import { useToast } from "@/hooks/use-toast";
import { fetchCartItems } from "@/redux/shop/Cart";

const CartContain = ({ cartItems }) => {
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const dispatch = useDispatch();
  function handleCartDeleteItem(getCartItem) {
    dispatch(
      deleteCartItems({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.status === true) {
        toast({
          title: "cart item delete successfully",
        });
      }
    });
  }
  function handleUpdateQuantity(getCartItem, typeOfAction) {
    dispatch(
      updateCartItems({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "cart item update successfully",
        });
      }
    });
  }
  console.log("salepriceis", cartItems?.saleprice);
  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItems?.image}
        alt={cartItems?.title}
        className="w-20 h-20 object-fill"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItems?.title}</h3>
        <div className="flex items-center mt-1 gap-3">
          <Button
            variant="outline"
            size="icon"
            disabled={cartItems?.quantity === 1}
            className="h-8 w-8 rounded-full"
            onClick={() => handleUpdateQuantity(cartItems, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItems.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => handleUpdateQuantity(cartItems, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          ₹
          {(
            (cartItems?.saleprice > 0
              ? cartItems?.saleprice
              : cartItems?.price) * cartItems?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          className="cursor-pointer mt-1"
          size={20}
          onClick={() => handleCartDeleteItem(cartItems)}
        />
      </div>
    </div>
  );
};

export default CartContain;
