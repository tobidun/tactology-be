import { Resolver, Mutation, Query, Args } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { CreateUserInput } from "./input/create-user.input";
import { User } from "./entities/user.entity";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(
    @Args("input") createUserInput: CreateUserInput
  ): Promise<User> {
    return this.userService.create(createUserInput);
  }
}
