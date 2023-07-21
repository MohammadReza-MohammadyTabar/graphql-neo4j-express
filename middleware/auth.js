import jwt from "jsonwebtoken"
import error  from "../errors/index.js"
import  {jwtSecret} from "../config/configs.config.js"

export const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new error.UnauthenticatedError("No token provided");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const {username } = decoded;

    req.user = {  username };

      next();

  } catch (error) {
    throw new error.UnauthenticatedError(error);
  }
};

