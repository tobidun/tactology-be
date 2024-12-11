import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { AuthService } from "./auth.service";

@Resolver("Auth")
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String)
  async login(
    @Args("username") username: string,
    @Args("password") password: string
  ) {
    console.log("login", username, password);
    const { accessToken } = await this.authService.login(username, password);
    return accessToken;
  }
}
