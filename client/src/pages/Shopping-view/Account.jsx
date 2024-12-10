import React from "react";
import accImg from "../../assets/account.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Orders from "@/components/Shopping-view/Orders";
import Address from "@/components/Shopping-view/Address";
const ShoppingAccount = () => {
  return (
    <>
      <div className="flex flex-col">
        <div className="relative h-[300px] w-full overflow-hidden">
          <img
            src={accImg}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="container m-auto grid grid-cols-1 gap-8 py-8">
          <div className="flex flex-col rounded-lg border bg-background p-6 shadow-md">
            <Tabs defaultValue="orders">
              <TabsList>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="address">Address</TabsTrigger>
              </TabsList>
              <TabsContent value="orders">
                <Orders />
              </TabsContent>
              <TabsContent value="address">
                <Address />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingAccount;
