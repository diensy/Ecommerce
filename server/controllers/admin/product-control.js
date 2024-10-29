import { model } from "mongoose";
import { handleImageFunction } from "../../helpers/cloudinary.js";
import Product from "../../models/product.js";
//For Image Upload
export const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await handleImageFunction(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Error Occured",
    });
  }
};

// For a new Product

export const addProduct = async (req, res) => {
  try {
    const {
      image,
      description,
      title,
      category,
      brand,
      price,
      saleprice,
      totalstock,
    } = req.body;
    const newlyProduct = new Product({
      image,
      description,
      title,
      category,
      brand,
      price,
      saleprice,
      totalstock,
    });

    await newlyProduct.save();
    res.status(201).json({
      success: true,
      data: newlyProduct,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Error Occured",
    });
  }
};

// For Fetch all Products

export const fetchAllProduct = async (req, res) => {
  try {
    const listProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listProducts,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Error Occured",
    });
  }
};

// For Edit all products

export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      description,
      title,
      category,
      brand,
      price,
      saleprice,
      totalstock,
    } = req.body;

    let findProduct = await Product.findById(id);
    if (!findProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product is not Found" });
    }
    findProduct.title = title || findProduct.title;
    findProduct.category = category || findProduct.category;
    findProduct.description = description || findProduct.description;
    findProduct.brand = brand || findProduct.brand;
    findProduct.totalstock = totalstock || findProduct.totalstock;
    findProduct.price = price === "" || 0 ? "" : price || findProduct.price;
    findProduct.saleprice =
      saleprice === "" || 0 ? "" : saleprice || findProduct.saleprice;
    findProduct.image = image || findProduct.image;
    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

// for Delete Product

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product is not Found" });
    }
    res.status(200).json({
      success: true,
      message: "Product is Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Error Occured",
    });
  }
};
