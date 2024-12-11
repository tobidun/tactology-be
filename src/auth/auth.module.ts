import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";
import { UserModule } from "../user/user.module";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || "your-secret-key",
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN || "24h",
      },
    }),
    UserModule,
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [JwtStrategy],
})
export class AuthModule {}
