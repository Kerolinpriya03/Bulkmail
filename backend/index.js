const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const mailRoutes = require("./routes/mailRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const cors = require("cors");

app.use(
  cors({
    origin:["https://grand-gnome-569046.netlify.app","https://sweet-croquembouche-273ac4.netlify.app"],
    credentials: true,
  })
);

dotenv.config();
const app = express();


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