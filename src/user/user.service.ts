import { ConflictException, Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import * as bcrypt from "bcryptjs";
import { User } from "./entities/user.entity";
import { CreateUserInput } from "./input/create-user.input";

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findByUsername(username);
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
    const isUserExist = await this.findByUsername(createUserInput.username);
    if (isUserExist) {
      throw new ConflictException("User already exists");
    }
    const user = this.userRepository.create({
      username: createUserInput.username,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }
}
