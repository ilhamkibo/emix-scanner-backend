import express from "express";
import userRoute from "./users.js";
import productRoute from "./products.js";

const router = express.Router();

router.use("/users", userRoute);
router.use("/products", productRoute);

export default router;
