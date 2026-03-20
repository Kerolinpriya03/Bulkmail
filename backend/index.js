const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const mailRoutes = require("./routes/mailRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"));

app.use("/api/auth", authRoutes);
app.use("/api/mail", mailRoutes);
app.use("/api/upload", uploadRoutes);

app.listen(5000, () => console.log("Server running on 5000"));

console.log("auth:", require("./routes/authRoutes"));
console.log("mail:", require("./routes/mailRoutes"));
console.log("upload:", require("./routes/uploadRoutes"));