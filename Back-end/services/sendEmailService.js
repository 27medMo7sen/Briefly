import nodemailer from "nodemailer";

export async function sendEmailService({
  to,
  subject,
  message,
  attachments = [],
} = {}) {
  const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 587, 
    secure: false,  
    service: "gmail",  
    auth: {
       user: process.env.BRIEFLY_EMAIL,
      pass: process.env.BRIEFLY_PASSWORD,
    },
  });

  const emailInfo = await transporter.sendMail({
    from: `"BRIEFLY" <${process.env.BRIEFLY_EMAIL}>`,
    to: to ? to : "",
    subject: subject ? subject : "Hello",
    html: message ? message : "",   
    attachments,
  });
  if (emailInfo.accepted.length) {
    console.log("hii")
    return true;
  }
  return false;
}