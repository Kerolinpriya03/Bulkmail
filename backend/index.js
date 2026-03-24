const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();   // ✅ MUST BE HERE (before using app)

app.use(
  cors({
    origin: [
      "https://glistening-malasada-8d4273.netlify.app",
      "https://grand-gnome-569046.netlify.app",
      "https://sweet-croquembouche-273ac4.netlify.app"
    ],
    credentials: true,
  })
);

app.use(express.json());

// routes
const authRoutes = require("./routes/authRoutes");
const mailRoutes = require("./routes/mailRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error 👉", err));

app.use("/api/auth", authRoutes);
app.use("/api/mail", mailRoutes);
app.use("/api/upload", uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on", PORT));