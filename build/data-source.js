"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var user_entity_1 = require("./entity/user.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "syednokhaizhaider",
    password: "1234",
    database: "node-ts",
    synchronize: true,
    logging: false,
    entities: [user_entity_1.User],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map