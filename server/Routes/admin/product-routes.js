import express from "express";
import {
  handleImageUpload,
  deleteProduct,
  addProduct,
  fetchAllProduct,
  editProduct,
} from "../../controllers/admin/product-control.js";
import { upload } from "../../helpers/cloudinary.js";

const Router = express.Router();

Router.post("/uploadimage", upload.single("my_file"), handleImageUpload);
Router.post("/add", addProduct);
Router.put("/edit/:id", editProduct);
Router.get("/fetch", fetchAllProduct);
Router.delete("/delete/:id", deleteProduct);

export default Router;
