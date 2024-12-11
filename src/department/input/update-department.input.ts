import { Field, ID, InputType } from "@nestjs/graphql";
import { SubDepartmentInput } from "./sub-department.input";

@InputType()
export class UpdateDepartmentInput {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => [SubDepartmentInput])
  subDepartments: SubDepartmentInput[];
}
