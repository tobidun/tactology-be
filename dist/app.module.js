"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const apollo_1 = require("@nestjs/apollo");
const auth_module_1 = require("./auth/auth.module");
const department_module_1 = require("./department/department.module");
const user_module_1 = require("./user/user.module");
const path_1 = require("path");
const config_1 = require("@nestjs/config");
const configuration_1 = require("./config/configuration");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default],
                isGlobal: true,
            }),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: (0, path_1.join)("schema.gql"),
                sortSchema: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    type: "postgres",
                    host: configService.get("db.host"),
                    port: configService.get("db.port"),
                    username: configService.get("db.username"),
                    password: configService.get("db.password"),
                    database: configService.get("db.database"),
                    entities: [__dirname + "/**/*.entity{.ts,.js}"],
                    synchronize: true,
                }),
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            department_module_1.DepartmentModule,
            user_module_1.UserModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map