import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Department } from "./entities/department.entity";

@Injectable()
export class DepartmentRepository {
  constructor(
    @InjectRepository(Department)
    private readonly repository: Repository<Department>
  ) {}

  async create(departmentData: Partial<Department>): Promise<Department> {
    const department = this.repository.create(departmentData);
    return this.repository.save(department);
  }

  async findAllWithRelations(userId: number): Promise<Department[]> {
    return this.repository.find({
      where: { createdBy: { id: userId } },
      relations: ["createdBy", "subDepartments"],
    });
  }

  async findById(id: number): Promise<Department | null> {
    return this.repository.findOne({
      where: { id },
      relations: ["createdBy", "subDepartments"],
    });
  }

  async save(departmentData: Partial<Department>): Promise<Department> {
    return this.repository.save(departmentData);
  }

  async removeDepartmentById(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
