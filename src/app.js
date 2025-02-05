import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/v1/index.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

export default app;
