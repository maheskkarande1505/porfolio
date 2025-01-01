const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "karandemahesh4@gmail.com",
    //nilbor407@gmail.com
    pass: "jefc sbcx odrb vtpu",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main(html_code) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'karandemahesh4@gmail.com', // sender address
    to: ["maheshkarande1505@gmail.com", ""], // list of receivers
    subject: "New Enquiry Alert", // Subject line
    text: "Hello World", // plain text body
    html: html_code, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}
module.exports = main;
