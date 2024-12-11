import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DepartmentService } from "./department.service";
import { Department } from "./entities/department.entity";
import { SubDepartment } from "./entities/sub-department.entity";
import { DepartmentRepository } from "./department.repository";
import { SubDepartmentRepository } from "./sub-department.repository";
import { DepartmentResolver } from "./department.resolver";
import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "@/user/user.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Department, SubDepartment])],
  providers: [
    DepartmentService,
    DepartmentRepository,
    SubDepartmentRepository,
    DepartmentResolver,
    JwtService,
    UserRepository,
  ],
})
export class DepartmentModule {}
