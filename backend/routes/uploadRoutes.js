const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), (req, res) => {
  const emails = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => emails.push(data.email))
    .on("end", () => {
      res.json({ emails });
    });
});

module.exports = router;