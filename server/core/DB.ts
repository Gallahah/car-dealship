const mysql = require('mysql2');
require('dotenv').config();

export class DB {
    conn;

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