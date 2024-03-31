// src/controllers/userController.ts
import { Request, Response } from "express";
import { Container } from "typedi";
import { AuthService } from "../services/authService";

class UserController {
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new Error("Email and password are required for login.");
      }

      const authServiceInstance: AuthService = Container.get(AuthService);
      const token = await authServiceInstance.login(email, password);
      res.json({ token });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, password, email } = req.body;

      if (!username || !password || !email) {
        throw new Error(
          "Username, password, and email are required for registration.",
        );
      }

      const authServiceInstance: AuthService = Container.get(AuthService);
      const token = await authServiceInstance.register(
        username,
        password,
        email,
      );
      res.json({ token });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default UserController;
