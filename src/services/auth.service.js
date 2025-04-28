import prisma from "../config/prisma.js";
import CustomError from "../utils/custom.error.js";
import JwtService from "./jwt.service.js";

class AuthService {
  constructor() {
    this.authPrisma = prisma;
    this.jwtService = new JwtService();
  }

  async register(data) {
    const findUser = await this.authPrisma.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (findUser) throw new CustomError("This username exists.", 409);

    const user = await this.authPrisma.user.create({
      data: data,
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
      },
    });

    return user;
  }

  async login(data) {
    const findUser = await this.authPrisma.user.findUnique({
      where: {
        username: data.username,
        email: data.email,
      },
    });

    if (!findUser) throw new CustomError("Invalid username or email.", 401);

    const { access_token, refresh_token } = this.jwtService.generateToken(
      findUser.id
    );

    return { access_token, refresh_token };
  }
}

export default AuthService;
