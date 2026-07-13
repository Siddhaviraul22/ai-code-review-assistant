const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({
    message: "AI Code Review Assistant API is running",
  });
});

app.use("/api/auth", authRoutes);

pool
  .query("SELECT NOW()")
  .then(() => {
    console.log("PostgreSQL database connected");
  })
  .catch((error) => {
    console.error("Database connection error:", error.message);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});