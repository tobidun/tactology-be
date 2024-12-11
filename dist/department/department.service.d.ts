import { DepartmentRepository } from "./department.repository";
import { SubDepartmentRepository } from "./sub-department.repository";
import { CreateDepartmentInput } from "./input/create-department.input";
import { UpdateDepartmentInput } from "./input/update-department.input";
import { Department } from "./entities/department.entity";
import { UserRepository } from "@/user/user.repository";
export declare class DepartmentService {
    private readonly departmentRepository;
    private readonly subDepartmentRepository;
    private readonly userRepository;
    constructor(departmentRepository: DepartmentRepository, subDepartmentRepository: SubDepartmentRepository, userRepository: UserRepository);
    create(createDepartmentInput: CreateDepartmentInput, userId: number): Promise<Department>;
    findAll(userId: number): Promise<Department[]>;
    getDepartmentById(id: number): Promise<Department | null>;
    updateDepartment(input: UpdateDepartmentInput): Promise<Department>;
    deleteDepartment(id: number): Promise<void>;
}
