"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GqlExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const common_2 = require("@nestjs/common");
let GqlExceptionFilter = class GqlExceptionFilter {
    catch(exception, host) {
        const gqlContext = graphql_1.GqlExecutionContext.create(host);
        const response = gqlContext.getContext().res;
        let status = 500;
        let message = "An unexpected error occurred";
        let errorCode = "INTERNAL_SERVER_ERROR";
        let stacktrace;
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            message = exception.message;
            errorCode = "CUSTOM_ERROR";
            stacktrace =
                process.env.NODE_ENV === "development" ? exception.stack : undefined;
            if (exception instanceof common_2.UnauthorizedException) {
                errorCode = "UNAUTHENTICATED";
                message = "Invalid credentials";
            }
        }
        else {
            message =
                exception instanceof Error ? exception.message : String(exception);
        }
        if (process.env.NODE_ENV === "development") {
            console.error(exception);
        }
        response?.status(status).json({
            errors: [
                {
                    message,
                    error: errorCode,
                    statusCode: status,
                    extensions: {
                        errorCode,
                        stacktrace,
                    },
                },
            ],
            data: null,
        });
    }
};
exports.GqlExceptionFilter = GqlExceptionFilter;
exports.GqlExceptionFilter = GqlExceptionFilter = __decorate([
    (0, common_1.Catch)()
], GqlExceptionFilter);
//# sourceMappingURL=gql-exception.filter.js.map