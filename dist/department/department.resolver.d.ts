import { DepartmentService } from "./department.service";
import { Department } from "./entities/department.entity";
import { CreateDepartmentInput } from "./input/create-department.input";
import { UpdateDepartmentInput } from "./input/update-department.input";
export declare class DepartmentResolver {
    private readonly departmentService;
    constructor(departmentService: DepartmentService);
    createDepartment(createDepartmentInput: CreateDepartmentInput, req: any): Promise<Department>;
    departments(req: any): Promise<Department[]>;
    department(id: number): Promise<Department | null>;
    updateDepartment(input: UpdateDepartmentInput): Promise<Department>;
    deleteDepartment(id: number): Promise<Department>;
}
