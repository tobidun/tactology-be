"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentService = void 0;
const common_1 = require("@nestjs/common");
const department_repository_1 = require("./department.repository");
const sub_department_repository_1 = require("./sub-department.repository");
const sub_department_entity_1 = require("./entities/sub-department.entity");
const user_repository_1 = require("../user/user.repository");
let DepartmentService = class DepartmentService {
    constructor(departmentRepository, subDepartmentRepository, userRepository) {
        this.departmentRepository = departmentRepository;
        this.subDepartmentRepository = subDepartmentRepository;
        this.userRepository = userRepository;
    }
    async create(createDepartmentInput, userId) {
        const subDepartments = createDepartmentInput.subDepartments?.map((sub) => {
            const subDepartment = new sub_department_entity_1.SubDepartment();
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
    async findAll(userId) {
        return this.departmentRepository.findAllWithRelations(userId);
    }
    async getDepartmentById(id) {
        return this.departmentRepository.findById(id);
    }
    async updateDepartment(input) {
        const department = await this.departmentRepository.findById(input.id);
        if (!department) {
            throw new Error("Department not found");
        }
        department.name = input.name;
        const updatedSubDepartments = await Promise.all(input.subDepartments.map(async (subDepartmentData) => {
            let subDepartment;
            if (!subDepartmentData.id) {
                const lastSubDepartment = await this.subDepartmentRepository.findOne({
                    where: { department: department },
                    order: { id: "DESC" },
                });
                const newId = lastSubDepartment ? lastSubDepartment.id + 1 : 1;
                subDepartment = {
                    id: newId,
                    name: subDepartmentData.name,
                    department: department,
                };
            }
            else {
                subDepartment = await this.subDepartmentRepository.findOne({
                    where: { id: subDepartmentData.id },
                });
                if (subDepartment) {
                    subDepartment.name = subDepartmentData.name;
                }
                else {
                    throw new Error(`SubDepartment with ID ${subDepartmentData.id} not found`);
                }
            }
            return subDepartment;
        }));
        await this.subDepartmentRepository.save(updatedSubDepartments);
        return this.departmentRepository.save(department);
    }
    async deleteDepartment(id) {
        const department = await this.departmentRepository.findById(id);
        if (!department)
            throw new Error("Department not found");
        await this.departmentRepository.removeDepartmentById(id);
        return department;
    }
};
exports.DepartmentService = DepartmentService;
exports.DepartmentService = DepartmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [department_repository_1.DepartmentRepository,
        sub_department_repository_1.SubDepartmentRepository,
        user_repository_1.UserRepository])
], DepartmentService);
//# sourceMappingURL=department.service.js.map