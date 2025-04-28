import AuthService from "../services/auth.service.js";

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async registerController(req, res, next) {
    try {
      const data = req.body;

      const user = await this.authService.register(data);

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async loginController(req, res, next) {
    try {
      const data = req.body;

      const { access_token, refresh_token } = await this.authService.login(
        data
      );

      res.status(201).json({
        success: true,
        message: "Tizimga mofaqyatli kirdingiz.",
        access_token,
        refresh_token,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
