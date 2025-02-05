import express from "express";
import User from "../../models/users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await User.findAll();
    const users = response.map((user) => user.toJSON());
    res.send(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/101", (req, res) => {
  res.send("This is user 101 route!");
});

router.get("/102", (req, res) => {
  res.send("This is user 102 route!");
});

export default router;
