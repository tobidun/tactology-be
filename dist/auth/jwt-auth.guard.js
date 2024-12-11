"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const graphql_1 = require("@nestjs/graphql");
let JwtAuthGuard = class JwtAuthGuard {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    canActivate(context) {
        const request = this.getRequest(context);
        if (!request) {
            throw new common_1.UnauthorizedException("Invalid context: Request is undefined");
        }
        const authHeader = request.headers["authorization"];
        if (!authHeader) {
            throw new common_1.UnauthorizedException("Authorization header is missing");
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new common_1.UnauthorizedException("Token is missing");
        }
        try {
            const decoded = this.jwtService.decode(token);
            request.user = decoded;
            return true;
        }
        catch (err) {
            console.error("JWT Verification Failed:", err.message);
            throw new common_1.UnauthorizedException("Invalid or expired token");
        }
    }
    getRequest(context) {
        if (context.getType() === "http") {
            return context.switchToHttp().getRequest();
        }
        try {
            const gqlContext = graphql_1.GqlExecutionContext.create(context);
            return gqlContext.getContext().req;
        }
        catch {
            throw new common_1.UnauthorizedException("Unsupported context type");
        }
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map