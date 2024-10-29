import express from "express";

import {
  addToCart,
  deleteCartItems,
  fetchCartItems,
  updateCartItems,
} from "../../controllers/shop/cart.js";

const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);
router.delete("/:userId/:productId", deleteCartItems);
router.put("/update", updateCartItems);
export default router;
