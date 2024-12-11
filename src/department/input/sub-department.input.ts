import { InputType, Field, ID } from "@nestjs/graphql";

@InputType()
export class SubDepartmentInput {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;
}
