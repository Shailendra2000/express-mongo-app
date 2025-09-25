import { Request, Response, NextFunction } from "express";
import { JwtService } from "../services/jwt.service";

const jwtService = new JwtService();

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const payload = jwtService.verifyToken(token);
    if (!payload) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = payload;
    next();
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
