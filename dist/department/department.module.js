"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const department_service_1 = require("./department.service");
const department_entity_1 = require("./entities/department.entity");
const sub_department_entity_1 = require("./entities/sub-department.entity");
const department_repository_1 = require("./department.repository");
const sub_department_repository_1 = require("./sub-department.repository");
const department_resolver_1 = require("./department.resolver");
const jwt_1 = require("@nestjs/jwt");
const user_repository_1 = require("../user/user.repository");
let DepartmentModule = class DepartmentModule {
};
exports.DepartmentModule = DepartmentModule;
exports.DepartmentModule = DepartmentModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([department_entity_1.Department, sub_department_entity_1.SubDepartment])],
        providers: [
            department_service_1.DepartmentService,
            department_repository_1.DepartmentRepository,
            sub_department_repository_1.SubDepartmentRepository,
            department_resolver_1.DepartmentResolver,
            jwt_1.JwtService,
            user_repository_1.UserRepository,
        ],
    })
], DepartmentModule);
//# sourceMappingURL=department.module.js.map