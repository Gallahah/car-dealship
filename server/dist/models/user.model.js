"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
class UserModel {
    constructor(db) {
        this.conn = db.conn;
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield this.conn.query("SELECT * FROM users ORDER BY id");
            return rows;
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isNaN(id)) {
                throw new Error("Invalid user ID");
            }
            const [rows] = yield this.conn.query("SELECT * FROM users WHERE id = ?", [id]);
            return rows[0];
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield this.conn.query("SELECT * FROM users WHERE email = ?", [email]);
            return rows[0];
        });
    }
    loginUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield this.conn.query("SELECT * FROM users WHERE email = ?", [email]);
            return rows;
        });
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.conn.query("INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)", [userData.firstName, userData.lastName, userData.email, userData.password]);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.conn.query("DELETE FROM users WHERE id = ?", [id]);
        });
    }
    updateUser(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateUserDataArray = Object.entries(userData);
            let setStatement = "";
            let preparedStatementData = [];
            for (let i = 0; i < updateUserDataArray.length; i++) {
                setStatement += `${updateUserDataArray[i][0]} = ?`;
                setStatement += (i + 1 !== updateUserDataArray.length) ? ", " : " ";
                preparedStatementData.push(updateUserDataArray[i][1]);
            }
            preparedStatementData.push(id);
            yield this.conn.execute(`UPDATE users SET ${setStatement} WHERE id = ?`, preparedStatementData);
            return true;
        });
    }
}
exports.UserModel = UserModel;
