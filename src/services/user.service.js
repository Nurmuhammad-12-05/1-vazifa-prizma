import prisma from "../config/prisma.js";
import CustomError from "../utils/custom.error.js";

class UserService {
  constructor() {
    this.userPrisma = prisma;
  }

  async createUser(data) {
    const finduser = await this.userPrisma.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (finduser) throw new CustomError("This username exists.");

    const user = await this.userPrisma.user.create({
      data: data,
      select: {
        id: true,
        username: true,
        name: true,
      },
    });

    return user;
  }

  async getAllUser() {
    const users = await this.userPrisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
      },
    });

    if (!users) throw new CustomError("No users found", 401);

    return users;
  }

  async getOneUser(id) {
    const user = await this.userPrisma.user.findUnique({
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
      },
      where: {
        id: id,
      },
    });

    if (!user) throw new CustomError("User not found.", 401);

    return user;
  }

  async updateUser(id, data) {
    const user = await this.userPrisma.user.update({
      where: {
        id: id,
      },
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

  async deleteUser(id) {
    const user = await this.userPrisma.user.delete({
      where: {
        id: id,
      },
    });

    if (!user) throw new CustomError("user not found.", 401);
  }
}

export default UserService;
