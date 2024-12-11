"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    db: {
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT ?? "5432", 10),
        username: process.env.DB_USERNAME || "postgres",
        password: process.env.DB_PASSWORD || "postgres",
        database: process.env.DB_NAME || "department_management",
    },
});
//# sourceMappingURL=configuration.js.map