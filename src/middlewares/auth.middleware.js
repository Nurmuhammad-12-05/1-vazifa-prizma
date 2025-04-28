import JwtService from "../services/jwt.service.js";

const jwtService = new JwtService();

const AuthMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const payloadData = jwtService.verifyToken(token);

    req.userId = payloadData.userId;

    next();
  } catch (error) {
    next(error);
  }
};

export default AuthMiddleware;
