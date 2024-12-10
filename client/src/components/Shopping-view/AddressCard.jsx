import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const AddressCard = ({ addressInfo, handelDeleteAddress,handelEditInfoAddress}) => {
  return (
    <>
      <Card>
        <CardContent className="grid p-4 gap-4">
          <Label>Address: {addressInfo?.address}</Label>
          <Label>City: {addressInfo?.city}</Label>
          <Label>Pincode: {addressInfo?.pincode}</Label>
          <Label>Phone: {addressInfo?.phone}</Label>
          <Label>Notes: {addressInfo?.notes}</Label>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-3">
          <Button onClick={()=>handelEditInfoAddress(addressInfo)}>Edit</Button>
          <Button onClick={()=>handelDeleteAddress(addressInfo)}>Delete</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default AddressCard;
