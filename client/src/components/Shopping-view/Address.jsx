import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/CommonForm";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  addNewAddress,
  deleteAddress,
  fetchAllAddress,
  upadteAddress,
} from "@/redux/shop/Address-slice";
import AddressCard from "./AddressCard";
import { useToast } from "@/hooks/use-toast";
const initialAddressFormdata = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};
const Address = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shoppingAddress);
  const [formData, setFormData] = useState(initialAddressFormdata);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { toast } = useToast();
  // Add new address
  async function handelManageAddress(event) {
    event.preventDefault();
    try {
      if (addressList.length >= 3 && currentEditedId === null) {
        toast({
          title: "You only add max 3 addresses",
          variant: "destructive",
        });
        return;
      }
      let result;

      if (currentEditedId !== null) {
        // Update address
        result = await dispatch(
          upadteAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formdata: formData,
          })
        );
        if (result?.payload?.success) {
          Swal.fire("Success", "Address updated successfully", "success");
          dispatch(fetchAllAddress(user?.id));
          setCurrentEditedId(null);
          setFormData(initialAddressFormdata);
        } else {
          Swal.fire(
            "Error",
            "Unable to update address. Please try again.",
            "error"
          );
        }
      } else {
        // Add new address
        result = await dispatch(
          addNewAddress({
            ...formData,
            userId: user?.id,
          })
        );
        if (result?.payload?.success) {
          Swal.fire("Success", "Address added successfully", "success");
          dispatch(fetchAllAddress(user?.id));
          setFormData(initialAddressFormdata);
        } else {
          Swal.fire(
            "Error",
            "Unable to add address. Please try again.",
            "error"
          );
        }
      }
    } catch (error) {
      console.error("Error saving address:", error);
      Swal.fire("Error", "An unexpected error occurred.", "error");
    }
  }

  // Form Validation
  function isFormValid() {
    return Object.keys(formData)
      .map((key) => {
        const value = formData[key];
        return typeof value === "string"
          ? value.trim() !== ""
          : value !== null && value !== undefined;
      })
      .every((item) => item);
  }

  // Fetch all address
  useEffect(() => {
    dispatch(fetchAllAddress(user?.id));
  }, [dispatch]);
  function handelDeleteAddress(getCurrentAddress) {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this address? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          deleteAddress({ userId: user?.id, addressId: getCurrentAddress?._id })
        ).then((data) => {
          if (data?.payload?.success) {
            Swal.fire("Deleted!", "The address has been deleted.", "success");
            dispatch(fetchAllAddress(user?.id));
          } else {
            Swal.fire(
              "Error",
              "There was an issue deleting the address.",
              "error"
            );
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "The address is safe.", "info");
      }
    });
  }
  // Edit the address
  function handelEditInfoAddress(getCurrentAddress) {
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress.phone,
      pincode: getCurrentAddress.pincode,
      notes: getCurrentAddress.notes,
    });
  }
  return (
    <>
      <Card>
        <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {addressList && addressList.length > 0
            ? addressList.map((addressItem) => (
                <AddressCard
                  addressInfo={addressItem}
                  handelDeleteAddress={handelDeleteAddress}
                  handelEditInfoAddress={handelEditInfoAddress}
                />
              ))
            : null}
        </div>
        <CardHeader>
          <CardTitle>
            {currentEditedId ? `Edit Address` : `Add New Address`}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <CommonForm
            formControls={addressFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText={currentEditedId ? "Update" : "Add"}
            onSubmit={handelManageAddress}
            isBtnDisabled={!isFormValid()}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default Address;
