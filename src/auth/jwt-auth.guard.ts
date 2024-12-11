import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = this.getRequest(context);

    if (!request) {
      throw new UnauthorizedException("Invalid context: Request is undefined");
    }

    const authHeader = request.headers["authorization"];
    if (!authHeader) {
      throw new UnauthorizedException("Authorization header is missing");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new UnauthorizedException("Token is missing");
    }

    try {
      const decoded = this.jwtService.decode(token);
      request.user = decoded;
      return true;
    } catch (err) {
      console.error("JWT Verification Failed:", err.message);
      throw new UnauthorizedException("Invalid or expired token");
    }
  }

  private getRequest(context: ExecutionContext) {
    if (context.getType() === "http") {
      return context.switchToHttp().getRequest();
    }

    try {
      const gqlContext = GqlExecutionContext.create(context);
      return gqlContext.getContext().req;
    } catch {
      throw new UnauthorizedException("Unsupported context type");
    }
  }
}
