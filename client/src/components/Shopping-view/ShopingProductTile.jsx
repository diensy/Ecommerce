import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const ShopingProductTile = ({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) => {
  return (
    <>
      <div>
        <Card className="w-full max-w-sm mx-auto">
          <div onClick={() => handleGetProductDetails(product?._id)}>
            <div className="relative">
              <img
                src={product?.image}
                alt={product?.title}
                className="w-full h-[300px] object-fill rounded-t-lg"
              />

              {product?.saleprice > 0 ? (
                <Badge className="absolute top-2 left-2 bg-red-400 hover:bg-red-700">
                  sale
                </Badge>
              ) : null}
            </div>
            <CardContent className="p-4 ">
              <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">
                  {(product?.category).toUpperCase()}
                </span>
                <span className="text-sm text-muted-foreground">
                  {(product?.brand).toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span
                  className={`${
                    product?.saleprice > 0 ? "line-through" : ""
                  } text-lg font-semibold text-primary`}
                >
                  ₹{product?.price}
                </span>
                {product?.saleprice > 0 ? (
                  <span className="text-lg font-bold">
                    ₹{product?.saleprice}
                  </span>
                ) : null}
              </div>
            </CardContent>
          </div>
          <CardFooter>
            <Button
              onClick={() => {
                handleAddtoCart(product?._id);
              }}
              className="w-full"
            >
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default ShopingProductTile;