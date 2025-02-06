const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/v1/index.js");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

module.exports = app;
