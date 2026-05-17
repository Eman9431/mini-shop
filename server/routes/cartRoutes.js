import express from "express";
import CartModel from "../models/cart.js";

const router = express.Router();

router.get("/getCart/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const items = await CartModel.find({ userId });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post("/addToCart", async (req, res) => {
  try {
    const { userId, productId, name, price } = req.body;

    const existing = await CartModel.findOne({ userId, productId });

    if (existing) {
      existing.quantity += 1;
      await existing.save();
      return res.json(existing);
    }

    const cartItem = new CartModel({
      userId,
      productId,
      name,
      price,
      quantity: 1,
    });

    await cartItem.save();
    res.json(cartItem);

  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

router.post("/syncCart", async (req, res) => {
  try {
    const { userId, items } = req.body;

    if (!userId || !items) {
      return res.status(400).json({ message: "Missing userId or items" });
    }

    // Delete old cart items for this user
    await CartModel.deleteMany({ userId });

    // Add new cart items
    const savedItems = await CartModel.insertMany(
      items.map((item) => ({
        ...item,
        userId,
      }))
    );

    res.json({ message: "Cart synced successfully", items: savedItems });
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});

export default router;