"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'gabrielalcantara',
    password: '',
    database: 'typeorm',
    synchronize: true,
    logging: false,
    entities: ['dist/src/entities/**/*.js']
};
//# sourceMappingURL=typeorm.config.js.map