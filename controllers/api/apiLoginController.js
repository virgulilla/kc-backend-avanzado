import jwt from "jsonwebtoken";
import UserModel from "../..//models/UserModel.js";
import createHttpError from "http-errors";

export async function loginJWT(req, res, next) {
  try {
    const { email, password } = req.body;
    console.log(email, password)
    const user = await UserModel.validateCredentials({ email, password });

    if (!user) {
      next(createHttpError(401, "Invalid credentials"));
      return;
    }

    jwt.sign(
      { user_id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
      (err, tokenJWT) => {
        if (err) {
          return next(err);
        }
        res.json({ tokenJWT });
      }
    );
  } catch (err) {
    next(err);
  }
}
