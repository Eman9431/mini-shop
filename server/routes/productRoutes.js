import express from "express";
import ProductModel from "../models/product.js";


//route handler to organize API endpoints
const router = express.Router();

//API route for GET all products
router.get("/getAllProducts", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API route for POST (Create) a product
router.post("/createProduct", async (req, res) => {
  try {
    const { product_id, name, price, stock, picture_link } = req.body;

    // Check if product already exists
    const existing = await ProductModel.findOne({ product_id });
    if (existing) {
      return res.status(400).json({ message: "Product ID already exists" });
    }

    const newProduct = new ProductModel({
      product_id,
      name,
      price,
      stock,
      picture_link
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ message: "Product created successfully", product: savedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API route for UPDATE a product
router.put("/updateProduct/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, price, stock, picture_link } = req.body;

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      { name, price, stock, picture_link },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API route for DELETE a product
router.delete("/deleteProduct/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
