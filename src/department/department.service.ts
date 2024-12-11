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

    if (!department) {
      throw new Error("Department not found");
    }

    // Update the department name
    department.name = input.name;

    // Process subdepartments
    const updatedSubDepartments = await Promise.all(
      input.subDepartments.map(async (subDepartmentData) => {
        let subDepartment;

        if (!subDepartmentData.id) {
          // Generate a new ID if missing (using the next available number)
          const lastSubDepartment = await this.subDepartmentRepository.findOne({
            where: { department: department }, // Find the last subdepartment in this department
            order: { id: "DESC" }, // Order by ID in descending order
          });

          const newId = lastSubDepartment ? lastSubDepartment.id + 1 : 1; // Generate next ID (or start from 1)

          // Create the new subdepartment object
          subDepartment = {
            id: newId, // Use the generated ID
            name: subDepartmentData.name,
            department: department, // Associate with the department
          } as SubDepartment;
        } else {
          // Find the existing subdepartment by ID
          subDepartment = await this.subDepartmentRepository.findOne({
            where: { id: subDepartmentData.id },
          });

          if (subDepartment) {
            // Update the existing subdepartment's name
            subDepartment.name = subDepartmentData.name;
          } else {
            // Handle cases where the ID is invalid or not found
            throw new Error(
              `SubDepartment with ID ${subDepartmentData.id} not found`
            );
          }
        }

        return subDepartment;
      })
    );

    // Save the updated subdepartments
    await this.subDepartmentRepository.save(updatedSubDepartments);

    // Save and return the updated department
    return this.departmentRepository.save(department);
  }

  async deleteDepartment(id: number): Promise<void> {
    const department = await this.departmentRepository.findById(id);
    if (!department) throw new Error("Department not found");

    await this.departmentRepository.removeDepartmentById(id);
  }
}
