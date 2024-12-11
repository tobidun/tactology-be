import { UserRepository } from "./user.repository";
import { User } from "./entities/user.entity";
import { CreateUserInput } from "./input/create-user.input";
export declare class UserService {
    private userRepository;
    constructor(userRepository: UserRepository);
    findById(id: number): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    create(createUserInput: CreateUserInput): Promise<User>;
}
