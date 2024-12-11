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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const department_entity_1 = require("./entities/department.entity");
let DepartmentRepository = class DepartmentRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async create(departmentData) {
        const department = this.repository.create(departmentData);
        return this.repository.save(department);
    }
    async findAllWithRelations(userId) {
        return this.repository.find({
            where: { createdBy: { id: userId } },
            relations: ["createdBy", "subDepartments"],
        });
    }
    async findById(id) {
        return this.repository.findOne({
            where: { id },
            relations: ["createdBy", "subDepartments"],
        });
    }
    async save(departmentData) {
        return this.repository.save(departmentData);
    }
    async removeDepartmentById(id) {
        await this.repository.delete(id);
    }
};
exports.DepartmentRepository = DepartmentRepository;
exports.DepartmentRepository = DepartmentRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(department_entity_1.Department)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], DepartmentRepository);
//# sourceMappingURL=department.repository.js.map