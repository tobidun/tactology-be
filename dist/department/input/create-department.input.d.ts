declare class CreateSubDepartmentInput {
    name: string;
}
export declare class CreateDepartmentInput {
    name: string;
    subDepartments?: CreateSubDepartmentInput[];
}
export {};
