import { Resolver, Query, Mutation, Args, ID, Context } from "@nestjs/graphql";
import { UnauthorizedException, UseGuards } from "@nestjs/common";
import { DepartmentService } from "./department.service";
import { Department } from "./entities/department.entity";
import { CreateDepartmentInput } from "./input/create-department.input";
import { UpdateDepartmentInput } from "./input/update-department.input";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Department)
  createDepartment(
    @Args("input") createDepartmentInput: CreateDepartmentInput,
    @Context("req") req: any
  ) {
    const user = req.user.payload;

    if (!user || !user.sub) {
      throw new UnauthorizedException("User not authorized");
    }

    const userId = user.sub;
    return this.departmentService.create(createDepartmentInput, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Department])
  departments(@Context("req") req: any) {
    const user = req.user.payload;

    if (!user || !user.sub) {
      throw new UnauthorizedException("User not authorized");
    }

    const userId = user.sub;
    return this.departmentService.findAll(userId);
  }

  @Query(() => Department)
  async department(@Args("id") id: number): Promise<Department | null> {
    return this.departmentService.getDepartmentById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Department)
  async updateDepartment(
    @Args("input") input: UpdateDepartmentInput
  ): Promise<Department> {
    return this.departmentService.updateDepartment(input);
  }

  @Mutation(() => Department)
  async deleteDepartment(@Args("id") id: number): Promise<Department> {
    return this.departmentService.deleteDepartment(id);
  }
}
