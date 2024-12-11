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
exports.CreateDepartmentInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let CreateSubDepartmentInput = class CreateSubDepartmentInput {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], CreateSubDepartmentInput.prototype, "name", void 0);
CreateSubDepartmentInput = __decorate([
    (0, graphql_1.InputType)()
], CreateSubDepartmentInput);
let CreateDepartmentInput = class CreateDepartmentInput {
};
exports.CreateDepartmentInput = CreateDepartmentInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], CreateDepartmentInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => [CreateSubDepartmentInput], { nullable: true }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateSubDepartmentInput),
    __metadata("design:type", Array)
], CreateDepartmentInput.prototype, "subDepartments", void 0);
exports.CreateDepartmentInput = CreateDepartmentInput = __decorate([
    (0, graphql_1.InputType)()
], CreateDepartmentInput);
//# sourceMappingURL=create-department.input.js.map