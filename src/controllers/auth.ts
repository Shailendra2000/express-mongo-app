import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  private authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    await this.authService.register({ name, email, password });
    return res.status(201).json({ message: "user registered successfully!" });
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const data = await this.authService.login(email, password);
    if (data.isAuthenticated) {
      return res.status(201).json({ tokens: data.tokens });
    }
    return res.status(400).json({ message: "Invalid Credentials" });
  };

  refreshToken = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    const acccesToken = this.authService.refreshToken(refreshToken);
    if (acccesToken) {
      return res.status(201).json({ acccesToken });
    }
    return res.status(400).json({ message: "Invalid Refresh Token" });
  };
}
