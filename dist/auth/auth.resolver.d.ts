import { AuthService } from "./auth.service";
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    login(username: string, password: string): Promise<string>;
}
