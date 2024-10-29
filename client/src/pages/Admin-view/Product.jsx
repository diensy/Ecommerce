import ImageUpload from "@/components/Admin-view/ImageUpload";
import ProductTile from "@/components/Admin-view/ProductTile";
import CommonForm from "@/components/common/CommonForm";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProduct,
} from "@/redux/admin/products-slice";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const initialFormData = {
  image: null,
  title: "",
  category: "",
  description: "",
  brand: "",
  price: "",
  saleprice: "",
  totalstock: "",
};
const AdminProduct = () => {
  const [openCreateProduct, setOpenCreateProduct] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoad, setImageLoad] = useState(false);
  const [EditedId, setEditedId] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();
  function onSubmit(event) {
    event.preventDefault();
    EditedId !== null
      ? dispatch(editProduct({ id: EditedId, formData })).then((data) => {
          console.log(formData, "edit");
          if (data?.payload?.success) {
            dispatch(fetchAllProduct());
            setFormData(initialFormData);
            setOpenCreateProduct(false);
            setEditedId(null);
            toast({
              title: "Product Edit Successfully",
            });
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          console.log(data);
          if (data?.payload?.success) {
            dispatch(fetchAllProduct());
            setImageFile(null);
            setFormData(initialFormData);
            setOpenCreateProduct(false);
            toast({
              title: "Product add successfully",
            });
          }
        });
  }
  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }
  useEffect(() => {
    dispatch(fetchAllProduct());
  }, [dispatch]);

  function handleDelte(getCurrentProduct) {
    console.log(getCurrentProduct);
    dispatch(deleteProduct(getCurrentProduct)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProduct());
      }
    });
  }
  console.log(formData, "ProductLIst");
  return (
    <>
      <div className="mb-5 w-full flex  justify-end">
        <Button onClick={() => setOpenCreateProduct(true)}>
          Add new product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-col-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem, index) => (
              <ProductTile
                key={index}
                product={productItem}
                setEditedId={setEditedId}
                setOpenCreateProduct={setOpenCreateProduct}
                setFormData={setFormData}
                handleDelte={handleDelte}
              />
            ))
          : null}
      </div>

      <Sheet
        open={openCreateProduct}
        onOpenChange={() => {
          setOpenCreateProduct(false);
          setEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle
              className="italic text-xl font-bold"
              style={{ textShadow: "2px 4px 4px rgba(100, 50, 50, 0.5)" }}
            >
              {EditedId !== null ? "Edit Product" : "Add Products"}
            </SheetTitle>
            <ImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              setImageLoad={setImageLoad}
              imageLoad={imageLoad}
            />
          </SheetHeader>
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText={EditedId !== null ? "Edit" : "Add"}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AdminProduct;
