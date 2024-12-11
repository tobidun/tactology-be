import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      console.log("User not found");
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Invalid password");
      return null;
    }

    const { password: _, ...result } = user;
    return result;
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign({
        payload,
        secret: process.env.JWT_SECRET || "secret-key",
      }),
    };
  }
}
