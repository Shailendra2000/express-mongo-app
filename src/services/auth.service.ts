import { IUser } from "../database/models/user";
import { IRegisterUser } from "../interfaces/user";
import { UserAbstract } from "../repositories/user.abstract";
import { JwtService, TokenType } from "./jwt.service";

export class AuthService {
  private userRepository: UserAbstract;
  private jwtService: JwtService;
  constructor(userRepository: UserAbstract, jwtService: JwtService) {
    this.userRepository = userRepository;
    this.jwtService = jwtService;
  }

  register(req: IRegisterUser) {
    return this.userRepository.create(req);
  }

  async login(
    email: string,
    password: string
  ): Promise<
    | {
        isAuthenticated: true;
        tokens: { accessToken: string; refreshToken: string };
        user: IUser;
      }
    | { isAuthenticated: false }
  > {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return { isAuthenticated: false };
    }
    const matched = await user.comparePassword(password);
    if (!matched) {
      return { isAuthenticated: false };
    }
    const [accessToken, refreshToken] = [
      this.jwtService.createToken(
        {
          name: user.name,
          id: user.id,
          email: user.email,
          tokenType: TokenType.ACCESS,
        },
        TokenType.ACCESS
      ),
      this.jwtService.createToken(
        {
          name: user.name,
          id: user.id,
          email: user.email,
          tokenType: TokenType.REFRESH,
        },
        TokenType.REFRESH
      ),
    ];
    return {
      isAuthenticated: true,
      tokens: { accessToken, refreshToken },
      user,
    };
  }

  refreshToken(refreshToken: string) {
    const payload = this.jwtService.verifyToken(refreshToken);
    if (payload && payload.tokenType === TokenType.REFRESH) {
      return this.jwtService.createToken(payload, TokenType.ACCESS);
    }
    return null;
  }
}
