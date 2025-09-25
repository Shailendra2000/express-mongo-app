import { Request } from "express";
import { TokenPayload } from "./services/jwt.service";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}
