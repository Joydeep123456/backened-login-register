// const expressAsyncHandler = require("express-async-handler");
import expressAsyncHandler from "express-async-handler";
// const dotenv = require("dotenv");
import dotenv from "dotenv"
// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";

dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_MAIL, // generated ethereal user
    pass: process.env.SMTP_PASSWORD, // generated ethereal password
  },
});

const sendEmail = expressAsyncHandler(async (req, res) => {
    const { name, email, password} = req.body;
    console.log(`${name} Hello!!`);
  console.log(name, email, password);

  var mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: `Your password is ${password}`,
    text: "Thanks for registering hope u have a grat time ahead!!",
  };
//   console.log(mailOptions);

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(`Error is ${error}`);
    } else {
      console.log("Email sent successfully!");
      alert('Email Sent Succesfully!!')
    }
  });
});

// module.exports = { sendEmail };
export default sendEmail;