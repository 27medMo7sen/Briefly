import { hashSync, compareSync } from "bcrypt";
import { userModel } from "./user.model.js";
import { generateToken, verifyToken } from "../../utils/tokenFunctions.js";
import { emailTemplate } from "../../utils/emailTemplate.js";
import { sendEmailService } from "../../services/sendEmailService.js";

//MARK: signup
export const signup = async (req, res) => {
  const { email, username, password, confirmPassword, role } = req.body;
  console.log(email, username, password, confirmPassword, role);

  if (password !== confirmPassword) {
    return next(new Error("Password does not match", { cause: 400 }));
  }
  if (await userModel.findOne({ email })) {
    return next(new Error("Email already exist", { cause: 400 }));
  }
  if (await userModel.findOne({ username })) {
    return next(new Error("Username already exist", { cause: 400 }));
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
  const isEmailsent = await sendEmailService({
    to: email,
    subject: "Email Confirmation",
    message: emailTemplate({
      link: "http://localhost:5173/confirmation?token=" + confirmationToken,
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
export const confirmEmail = async (req, res, next) => {
  const { token } = req.params;
  const { email, username, role } = verifyToken({
    token,
    signature: process.env.EMAIL_CONFIRMATION_SIGNATURE,
  });
  if (!email) {
    return next(new Error("Invalid token", { cause: 400 }));
  }
  const user = await userModel.findOne({ email });

  if (!user) {
    return next(new Error("User not found", { cause: 400 }));
  }
  if (user.isConfirmed) {
    return next(new Error("Email already confirmed", { cause: 400 }));
  }
  const userToken = generateToken({
    payload: { email, username, role },
    signature: process.env.SIGNIN_SIGNATURE,
    expiresIn: "1h",
  });
  user.token = userToken;
  user.isConfirmed = true;
  console.log(user);
  await user.save();
  return res.status(200).json({ message: "Email confirmed", user });
};

//MARK: login
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new Error("Invalid email", { cause: 400 }));
  }
  if (!user.isConfirmed) {
    return next(new Error("Email not confirmed", { cause: 400 }));
  }
  if (!compareSync(password, user.password)) {
    return next(new Error("Invalid password", { cause: 400 }));
  }
  const token = generateToken({
    payload: { email, username: user.username, role: user.role },
    signature: process.env.SIGNIN_SIGNATURE,
    expiresIn: "1h",
  });
  user.token = token;
  await user.save();
  return res.status(200).json({ user });
};
