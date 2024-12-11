import { SubDepartment } from "./sub-department.entity";
import { User } from "@/user/entities/user.entity";
export declare class Department {
    id: number;
    name: string;
    subDepartments: SubDepartment[];
    createdBy: User;
}
