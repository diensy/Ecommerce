import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  fetchCartItems,
  setProductDetails,
} from "@/redux/shop/Cart";
import { toast } from "@/hooks/use-toast";

const ProductDetails = ({ open, setOpen, productDetails }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }
  function handleClose() {
    setOpen(false);
    dispatch(setProductDetails(null));
  }
  return (
    <>
      <div>
        <Dialog open={open} onOpenChange={handleClose}>
          <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[65vw]">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={productDetails?.image}
                alt={productDetails?.title}
                width={600}
                height={600}
                className="aspect-square w-full object-fill "
              />
            </div>
            <div className="">
              <div>
                <h2 className="text-2xl font-extrabold">
                  {productDetails?.title}
                </h2>
                <p className="text-muted-foreground text-xl mb-2 mt-3">
                  {productDetails?.description}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p
                  className={`${
                    productDetails?.saleprice > 0 ? "line-through text-xl" : ""
                  } text-3xl font-bold text-primary`}
                >
                  ₹{productDetails?.price}
                </p>
                {productDetails?.saleprice > 0 ? (
                  <p className="text-3xl font-bold">
                    ₹{productDetails?.saleprice}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="flex items-center gap-2 mt-2 ">
                <div className="flex items-center gap-0.5">
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                </div>
                <span className="">(4.5)</span>
              </div>
              <div className="mb-5">
                <Button
                  className="mt-5 w-full"
                  onClick={() => handleAddtoCart(productDetails?._id)}
                >
                  {" "}
                  Add to Cart
                </Button>
              </div>
              <Separator />
              <div className="max-h-[300px] overflow-auto">
                <h3 className="text-xl font-semibold mb-4">Reviews</h3>
                <div className="grid gap-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>Di</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex itmes-center gap-2">
                        <h3 className="font-bold">Dinesh</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                      </div>
                      <p className="text-foreground">This is a good Product</p>
                    </div>
                  </div>
                </div>
                <div className="grid gap-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>Di</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex itmes-center gap-2">
                        <h3 className="font-bold">Dinesh</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                      </div>
                      <p className="text-foreground">This is a good Product</p>
                    </div>
                  </div>
                </div>
                <div className="grid gap-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>Di</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex itmes-center gap-2">
                        <h3 className="font-bold">Dinesh</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                      </div>
                      <p className="text-foreground">This is a good Product</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex gap-2">
                  <Input placeholder="Write a Review..." />
                  <Button className="outline-none">Submit</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ProductDetails;
