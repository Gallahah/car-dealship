"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const mysql = require('mysql2');
require('dotenv').config();
class DB {
    constructor() {
        this.conn = mysql.createPool({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        }).promise();
    }
}
exports.DB = DB;
