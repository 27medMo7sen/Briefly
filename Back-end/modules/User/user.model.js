import { model, Schema } from "mongoose";
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isConfirmed: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "student",
    enum: ["student", "employer", "admin"],
  },
  token: {
    type: String,
  },
});
export const userModel = model("User", userSchema);

