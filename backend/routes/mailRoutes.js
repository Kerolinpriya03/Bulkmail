const express = require("express");
const nodemailer = require("nodemailer");
const Mail = require("../models/mail");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/send", auth, async (req, res) => {
  const { subject, body, recipients } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    for (let email of recipients) {
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject,
        text: body,
      });
    }

    await Mail.create({
      subject,
      body,
      recipients,
      status: "Sent",
    });

    res.json({ message: "Emails sent successfully" });

  } catch (err) {
     console.log("EMAIL ERROR 👉", err);
    res.status(500).json({ message: "Failed to send emails" });
  }
});

module.exports = router;