import jwt from "jsonwebtoken";
import { appConfig } from "../app-utilities/app-config";

export interface TokenPayload {
  id: string;
  name: string;
  email: string;
  tokenType: TokenType;
}

export enum TokenType {
  ACCESS = "ACCESS",
  REFRESH = "REFRESH",
}

export class JwtService {
  private secret: string;

  constructor() {
    this.secret = appConfig.JWT_SECRET;
  }

  createToken(payload: TokenPayload, type: TokenType): string {
    return jwt.sign(
      {
        name: payload.name,
        id: payload.id,
        email: payload.email,
        tokenType: type,
      },
      this.secret,
      {
        expiresIn: type === TokenType.ACCESS ? "15m" : "7 Days",
      }
    );
  }

  verifyToken(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, this.secret) as TokenPayload;
    } catch (err) {
      return null;
    }
  }
}
