import express from "express";
import dotenv from "dotenv";
import usersRouter from "./routes/users.js";
import productsRouter from "./routes/products.js";

dotenv.config();
const port =
  process.env.APP_ENV === "production"
    ? process.env.PROD_PORT
    : process.env.DEV_PORT;

const app = express();

// root route
app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

// users route
app.use("/users", usersRouter);

// products route
app.use("/products", productsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
