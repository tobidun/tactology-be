import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Department } from "@/department/entities/department.entity";

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Field(() => [Department], { nullable: true })
  @OneToMany(() => Department, (department) => department.createdBy)
  createdDepartments: Department[];
}
