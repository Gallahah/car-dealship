import { Request, Response } from 'express';
import { DB } from "../core/DB";
import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const db = new DB();
const userModel = new UserModel(db);

const getUsers = async (req: Request, res: Response) => {
    const data = await userModel.getAllUsers();
    res.send(data);
}

const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await userModel.getUser(parseInt(id));
    res.send(data);
}

const getUserByEmail = async (req: Request, res: Response) => {
    const { email } = req.body;
    const data = await userModel.getUserByEmail(email);
    res.send(data);
}

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const rows = await userModel.loginUser(email);

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = rows[0];

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ email: user.email, id: user.id }, "secret_key", {
            expiresIn: '1h',
        });
        return res.status(200).json({ token, firstName: user.firstName });
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

const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userData = req.body;
    await userModel.updateUser(parseInt(id), userData);
    res.status(200).send("Successfully updated user");
}

export {
    getUser,
    getUsers,
    createUser,
    deleteUser,
    updateUser,
    loginUser,
}