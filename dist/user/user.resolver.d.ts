import { UserService } from "./user.service";
import { CreateUserInput } from "./input/create-user.input";
import { User } from "./entities/user.entity";
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserInput: CreateUserInput): Promise<User>;
}
