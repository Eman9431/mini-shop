import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    product_id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true }, // removed unique
    stock: { type: Number, required: true },
    picture_link: { type: String, required: true }
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("products", productSchema);
export default ProductModel;
