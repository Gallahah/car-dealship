import { Request, Response } from 'express';
import { DB } from "../core/DB";
import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const db = new DB();
const userModel = new UserModel(db);
const secret = process.env.JWT_SECRET as string;

const getUsers = async (req: Request, res: Response) => {
    const data = await userModel.getAllUsers();
    res.send(data);
}

const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await userModel.getUser(parseInt(id));
    res.send(data);
}

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const rows = await userModel.loginUser(email);

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email' });
        }

        const user = rows[0];

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            jwt.sign({ email: user.email, id: user.id, firstName: user.firstName, lastName: user.lastName }, secret, { expiresIn: '1h' }, (err, token) => {
                if (err) throw err;
                res.cookie("token", token).json(user);
            })
        }
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

    } catch (error) {
        console.error('Error occurred during login:', error);
        return res.status(500).json({ error: 'An error occurred during login' });
    }
}

const createUser = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        if (!password) {
            return res.status(400).json({ error: 'Password required!' });
        }

        const existingUser = await userModel.getUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = {
            firstName,
            lastName,
            email,
            password: hashedPassword,
        };

        await userModel.createUser(userData);
        res.status(201).json({ message: 'User created successfully' })
    } catch (error) {
        console.error('Error occurred during registration:', error);
        res.status(500).json({ error: 'An error occurred during registration' });
    }
}

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    await userModel.deleteUser(parseInt(id));
    res.send(id);
}

const getProfile = async (req: Request, res: Response) => {
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, secret, {}, (err, user) => {
            if (err) return res.status(401).json({ error: 'Invalid token' });
            res.json(user);
        })
    } else {
        res.json(null);
    }
}

export {
    getUser,
    getUsers,
    createUser,
    deleteUser,
    loginUser,
    getProfile
}