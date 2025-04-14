import { userModel } from "../modules/User/user.model.js";
import { verifyToken } from "../utils/tokenFunctions.js";
export const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  console.log(authorization.startsWith(process.env.AUTHORIZATION_PREFIX));
  if (
    !authorization ||
    !authorization.startsWith(process.env.AUTHORIZATION_PREFIX)
  ) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  console.log("here");
  const splitedToken = authorization.split(" ")[1];
  try {
    const decodedData = verifyToken({
      token: splitedToken,
      signature: process.env.SIGNIN_SIGNATURE,
    });
    console.log(decodedData);
    const findUser = await userModel.findById(
      decodedData._id,
      "email userName role token"
    );
    if (!findUser) {
      return next(new Error("Please SignUp", { cause: 400 }));
    }
    if (findUser.token != splitedToken) {
      return next(new Error("Please login first", { cause: 400 }));
    }
    req.user = findUser;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(432).json({ message: "Token Expired" });
    }
    return res.status(401).json({ message: "Unauthorized" });
  }
};
