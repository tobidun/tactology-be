import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { SubDepartment } from "./entities/sub-department.entity";

@Injectable()
export class SubDepartmentRepository {
  constructor(
    @InjectRepository(SubDepartment)
    private readonly repository: Repository<SubDepartment>
  ) {}

  async create(
    subDepartmentData: Partial<SubDepartment>
  ): Promise<SubDepartment> {
    const subDepartment = this.repository.create(subDepartmentData);
    return this.repository.save(subDepartment);
  }

  async save(subDepartments: any) {
    return this.repository.save(subDepartments);
  }

  async findOne(subDepartmentData: any) {
    return this.repository.findOne({
      where: {
        id: subDepartmentData.id,
      },
    });
  }
}
