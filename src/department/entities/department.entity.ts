import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { SubDepartment } from "./sub-department.entity";
import { User } from "@/user/entities/user.entity";

@ObjectType()
@Entity()
export class Department {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [SubDepartment], { nullable: true })
  @OneToMany(() => SubDepartment, (subDepartment) => subDepartment.department, {
    cascade: true,
    eager: true,
  })
  subDepartments: SubDepartment[];

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.createdDepartments, { nullable: true })
  @JoinColumn({ name: "createdBy" })
  createdBy: User;
}
