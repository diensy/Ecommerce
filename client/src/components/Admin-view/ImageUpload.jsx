import React, { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

const ImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoad,
  imageLoad,
  isEditMode,
}) => {
  const inputRef = useRef(null);
  function handleImageFile(event) {
    console.log(event.target.files);
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  }
  function onDragOver(event) {
    event.preventDefault();
  }
  function onDrop(event) {
    event.preventDefault();
    const dropFile = event.dataTransfer.files?.[0];
    if (dropFile) {
      setImageFile(dropFile);
    }
  }
  function handleRemove() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }
  async function uploadImageFromcloudinary() {
    setImageLoad(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      "http://localhost:5000/api/admin/products/uploadimage",
      data
    );
    console.log("response", response);
    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      setImageLoad(false);
    }
  }
  useEffect(() => {
    if (imageFile !== null) {
      uploadImageFromcloudinary();
    }
  }, [imageFile]);

  return (
    <>
      <div className="w-full max-w-md mx-auto">
        <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
        <div
          className="border-2 border-dashed p-4 rounded-lg "
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          <Input
            id="image-upload"
            type="file"
            className="hidden cursor-pointer "
            ref={inputRef}
            onChange={handleImageFile}
          />
          {!imageFile ? (
            <Label
              htmlFor="image-upload"
              className="flex flex-col items-center h-32 cursor-pointer"
            >
              <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2 mt-4" />
              <span>Drag & Drop or Click to upload image</span>
            </Label>
          ) : imageLoad ? (
            <Skeleton className="h-10 bg-gray-100" />
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileIcon className="w-8 text-primary mr-2 h-8" />
              </div>
              <p className="text-sm font-medium">{imageFile.name}</p>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                onClick={handleRemove}
              >
                <XIcon className="w-4 h-4" />
                <span className="sr-only">Remove File</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
