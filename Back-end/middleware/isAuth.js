import { userModel } from "../modules/User/user.model";
import { verifyToken } from "../utils/tokenFunctions";
export const isAuth = () => {
  return async (req, res, next) => {
    const { authorization } = req.headers;
    if (
      !authorization ||
      !authorization.startsWith(process.env.AUTHORIZATION_PREFIX)
    ) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const splitedToken = authorization.split(" ")[1];
    try {
      const decodedData = verifyToken({
        token: splitedToken,
        signature: process.env.SIGN_IN_TOKEN_SECRET,
      });

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
};
