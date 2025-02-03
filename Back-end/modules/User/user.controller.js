import { hashSync, compareSync } from "bcrypt";
import { userModel } from "./user.model.js";
import { generateToken, verifyToken } from "../../utils/tokenFunctions.js";
import { emailTemplate } from "../../utils/emailTemplate.js";
import { sendEmailService } from "../../services/sendEmailService.js";

//MARK: signup
export const signup = async (req, res) => {
  const { email, username, password, confirmPassword, role } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Password not match" });
  }
  if (await userModel.findOne({ email })) {
    return res.status(400).json({ message: "Email already exist" });
  }
  if (await userModel.findOne({ username })) {
    return res.status(400).json({ message: "Username already exist" });
  }
  const hashedPassword = hashSync(password, 10);

  const user = new userModel({
    email,
    username,
    password: hashedPassword,
    role,
  });
  await user.save();
  const confirmationToken = generateToken({
    payload: { email, username, role },
    signature: process.env.EMAIL_CONFIRMATION_SIGNATURE,
    expiresIn: "1h",
  });
  const confirmationLink = `http://localhost:3000/api/user/confirm/${confirmationToken}`;
  const isEmailsent = await sendEmailService({
    to: email,
    subject: "Email Confirmation",
    message: emailTemplate({
      link: confirmationLink,
      linkData:
        "Please click the button below to confirm your email and finish setting up your account. This link will expire in 1 hour.",
      subject: "Email Confirmation",
      buttonText: "Confirm",
    }),
  });
  if (!isEmailsent) return next(new Error("Email not sent", { cause: 500 }));
  return res.status(201).json({ message: "User created successfully" });
};

//MARK: confirm email
export const confirmEmail = async (req, res) => {
  const { token } = req.params;
  const { email, username, role } = verifyToken({
    token,
    signature: process.env.EMAIL_CONFIRMATION_SIGNATURE,
  });
  if (!email) {
    return res.status(400).json({ message: "Invalid token" });
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  user.isConfirmed = true;
  await user.save();
  return res.status(200).json({ message: "Email confirmed", user });
};

//MARK: login
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({
    email,
  });
  if (!user) {
    return res.status(400).json({ message: "Invalid email" });
  }
  if (!user.isConfirmed) {
    return res.status(400).json({ message: "Email not confirmed" });
  }
  if (!compareSync(password, user.password)) {
    return res.status(400).json({ message: "Invalid password" });
  }
  const token = generateToken({
    payload: { email, username: user.username, role: user.role },
  });
  user.token = token;
  await user.save();
  return res.status(200).json({ token });
};
