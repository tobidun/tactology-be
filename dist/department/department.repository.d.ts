import { Repository } from "typeorm";
import { Department } from "./entities/department.entity";
export declare class DepartmentRepository {
    private readonly repository;
    constructor(repository: Repository<Department>);
    create(departmentData: Partial<Department>): Promise<Department>;
    findAllWithRelations(userId: number): Promise<Department[]>;
    findById(id: number): Promise<Department | null>;
    save(departmentData: Partial<Department>): Promise<Department>;
    removeDepartmentById(id: number): Promise<void>;
}
