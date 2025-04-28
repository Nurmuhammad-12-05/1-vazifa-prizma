import UserService from "../services/user.service.js";

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async createUserController(req, res, next) {
    try {
      const data = req.body;

      const user = await this.userService.createUser(data);

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllUserController(req, res, next) {
    try {
      const users = await this.userService.getAllUser();

      res.status(201).json({
        success: true,
        users,
      });
    } catch (error) {
      next(error);
    }
  }

  async getOneUserController(req, res, next) {
    try {
      const id = req.params.id;

      const user = await this.userService.getOneUser(id);

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUserController(req, res, next) {
    try {
      const id = req.params.id;

      const data = req.body;

      const user = await this.userService.updateUser(id, data);

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUserController(req, res, next) {
    try {
      const id = req.params.id;

      await this.userService.deleteUser(id);

      res.status(201).json({
        success: true,
        message: "User deleted.",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
