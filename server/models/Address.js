import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    userId: String,
    address: String,
    city: String,
    pincode: Number,
    phone: Number,
    notes: String,
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);
export default Address;