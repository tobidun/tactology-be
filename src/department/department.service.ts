import { Injectable, NotFoundException } from "@nestjs/common";
import { DepartmentRepository } from "./department.repository";
import { SubDepartmentRepository } from "./sub-department.repository";
import { CreateDepartmentInput } from "./input/create-department.input";
import { UpdateDepartmentInput } from "./input/update-department.input";
import { Department } from "./entities/department.entity";
import { SubDepartment } from "./entities/sub-department.entity";
import { UserRepository } from "@/user/user.repository";

@Injectable()
export class DepartmentService {
  constructor(
    private readonly departmentRepository: DepartmentRepository,
    private readonly subDepartmentRepository: SubDepartmentRepository,
    private readonly userRepository: UserRepository
  ) {}

  async create(
    createDepartmentInput: CreateDepartmentInput,
    userId: number
  ): Promise<Department> {
    const subDepartments = createDepartmentInput.subDepartments?.map((sub) => {
      const subDepartment = new SubDepartment();
      subDepartment.name = sub.name;
      return subDepartment;
    });

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error("User not found");
    }

    const department = await this.departmentRepository.create({
      name: createDepartmentInput.name,
      subDepartments,
      createdBy: user,
    });

    return department;
  }

  async findAll(userId: number): Promise<Department[]> {
    return this.departmentRepository.findAllWithRelations(userId);
  }

  async getDepartmentById(id: number): Promise<Department | null> {
    return this.departmentRepository.findById(id);
  }

  async updateDepartment(input: UpdateDepartmentInput): Promise<Department> {
    // Find the department by ID
    const department = await this.departmentRepository.findById(input.id);

    if (!department) throw new Error("Department not found");

    // Update the department name
    department.name = input.name;

    // Process subdepartments
    const subDepartmentsToSave = await Promise.all(
      input.subDepartments.map(async (subDepartmentData) => {
        // Find the existing subdepartment by departmentId and name
        const existingSubDepartment =
          await this.subDepartmentRepository.findOne(input, subDepartmentData);
        console.log(existingSubDepartment);

        if (existingSubDepartment) {
          // Overwrite the existing subdepartment's name with the new one
          existingSubDepartment.name = subDepartmentData.name; // Assuming `newName` is provided
          console.log(existingSubDepartment.name);
          console.log(subDepartmentData.name);
          return existingSubDepartment; // Return the updated subdepartment
        } else {
          // If no matching subdepartment found, return null or handle accordingly
          return null; // This depends on whether you want to handle non-matching cases
        }
      })
    );

    // Remove null values (if any subdepartments were not found) and save the updated subdepartments
    const validSubDepartmentsToSave = subDepartmentsToSave.filter(Boolean);
    await this.subDepartmentRepository.save(validSubDepartmentsToSave);

    // Save the updated department
    return this.departmentRepository.save(department);
  }

  async deleteDepartment(id: number): Promise<void> {
    const department = await this.departmentRepository.findById(id);
    if (!department) throw new Error("Department not found");

    await this.departmentRepository.removeDepartmentById(id);
  }
}
