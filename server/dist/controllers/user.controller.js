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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.updateUser = exports.deleteUser = exports.createUser = exports.getUsers = exports.getUser = void 0;
const DB_1 = require("../core/DB");
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db = new DB_1.DB();
const userModel = new user_model_1.UserModel(db);
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield userModel.getAllUsers();
    res.send(data);
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield userModel.getUser(parseInt(id));
    res.send(data);
});
exports.getUser = getUser;
const getUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const data = yield userModel.getUserByEmail(email);
    res.send(data);
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const rows = yield userModel.loginUser(email);
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const user = rows[0];
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const token = jsonwebtoken_1.default.sign({ email: user.email, id: user.id }, "secret_key", {
            expiresIn: '1h',
        });
        return res.status(200).json({ token, firstName: user.firstName });
    }
    catch (error) {
        console.error('Error occurred during login:', error);
        return res.status(500).json({ error: 'An error occurred during login' });
    }
});
exports.loginUser = loginUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const userData = {
            firstName,
            lastName,
            email,
            password: hashedPassword,
        };
        yield userModel.createUser(userData);
        res.status(201).json({ message: 'User created successfully' });
    }
    catch (error) {
        console.error('Error occurred during registration:', error);
        res.status(500).json({ error: 'An error occurred during registration' });
    }
});
exports.createUser = createUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield userModel.deleteUser(parseInt(id));
    res.send(id);
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userData = req.body;
    yield userModel.updateUser(parseInt(id), userData);
    res.status(200).send("Successfully updated user");
});
exports.updateUser = updateUser;
