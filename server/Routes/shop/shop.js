import express from "express";

import { getFilteredProducts, getProductDetails } from "../../controllers/shop/shop.js";
const router = express.Router();

router.get("/get", getFilteredProducts);
router.get("/get/:id", getProductDetails);

export default router;
