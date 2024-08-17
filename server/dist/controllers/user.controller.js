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
exports.getProfile = exports.loginUser = exports.deleteUser = exports.createUser = exports.getUsers = exports.getUser = void 0;
const DB_1 = require("../core/DB");
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db = new DB_1.DB();
const userModel = new user_model_1.UserModel(db);
const secret = process.env.JWT_SECRET;
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
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const rows = yield userModel.loginUser(email);
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email' });
        }
        const user = rows[0];
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (passwordMatch) {
            jsonwebtoken_1.default.sign({ email: user.email, id: user.id, firstName: user.firstName, lastName: user.lastName }, secret, { expiresIn: '1h' }, (err, token) => {
                if (err)
                    throw err;
                res.cookie("token", token).json(user);
            });
        }
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }
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
        if (!password) {
            return res.status(400).json({ error: 'Password required!' });
        }
        const existingUser = yield userModel.getUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists!' });
        }
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
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.cookies;
    if (token) {
        jsonwebtoken_1.default.verify(token, secret, {}, (err, user) => {
            if (err)
                return res.status(401).json({ error: 'Invalid token' });
            res.json(user);
        });
    }
    else {
        res.json(null);
    }
});
exports.getProfile = getProfile;
