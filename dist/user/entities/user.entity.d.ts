import { Department } from "@/department/entities/department.entity";
export declare class User {
    id: number;
    username: string;
    password: string;
    createdDepartments: Department[];
}
