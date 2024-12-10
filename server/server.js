import express, { json } from "express";
import { connect } from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import auth from "./Routes/auth/auth.js";
import adminProductsRouter from "./Routes/admin/product-routes.js";
import shopProductRouter from "./Routes/shop/shop.js";
import shopCartRouter from "./Routes/shop/cart.js";
import shopAddressRouter from "./Routes/shop/address.js";
import Stripe from "stripe";
import dotenv from "dotenv";
// Connect the DataBase

connect("mongodb+srv://dineshsahoo702:dinesh123@cluster0.e1zkm.mongodb.net/")
  .then(() => {
    console.log("MongoDb Connected");
  })
  .catch((error) => {
    console.error(error);
  });
dotenv.config();

//Payemnt
const stripe = new Stripe(process.env.SECRET_STRIPE_KEY);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(json());
app.use("/api/auth", auth);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/shop/products", shopProductRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// for payment

app.post("/checkout", async (req, res) => {
  try {
    if (!Array.isArray(req.body.items) || req.body.items.length === 0) {
      return res.status(400).json({ error: "Invalid Product" });
    }
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        return {
          price_data: {
            currency: "inr",
            product_data: { name: item.title },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});
