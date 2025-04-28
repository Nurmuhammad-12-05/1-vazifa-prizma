import jwt from "jsonwebtoken";
import CustomError from "../utils/custom.error.js";

class JwtService {
  constructor() {
    this.key = process.env.JWT_KEY;
  }

  generateToken(user_id) {
    const access_token = jwt.sign({ userId: user_id }, this.key, {
      expiresIn: "1h",
    });

    const refresh_token = jwt.sign({ userId: user_id }, this.key, {
      expiresIn: "2h",
    });

    return { access_token, refresh_token };
  }

  verifyToken(token) {
    try {
      const payload = jwt.verify(token, this.key);

      return payload;
    } catch (error) {
      throw new CustomError("token invalid", 401);
    }
  }
}

export default JwtService;
