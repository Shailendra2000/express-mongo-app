import { Router } from "express";
import { asyncErrorHandler } from "../app-utilities/async-error-handler";
import { UserRepository } from "../repositories/user";
import { AuthService } from "../services/auth.service";
import { AuthController } from "../controllers/auth";
import { JwtService } from "../services/jwt.service";
import {
  loginValidator,
  refreshTokenValidator,
  registerUserValidator,
} from "../request-validators/auth";

const authRoute = Router();
const userRepository = new UserRepository();
const jwtService = new JwtService();
const authService = new AuthService(userRepository, jwtService);
const authController = new AuthController(authService);

authRoute.post(
  "/register",
  registerUserValidator,
  asyncErrorHandler(authController.register)
);
authRoute.post(
  "/login",
  loginValidator,
  asyncErrorHandler(authController.login)
);
authRoute.post(
  "/refresh-token",
  refreshTokenValidator,
  asyncErrorHandler(authController.refreshToken)
);

export default authRoute;
