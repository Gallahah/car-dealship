import { Request, Response } from 'express';
import { DB } from "../core/DB";
import { UserModel } from "../models/user.model";

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

const createUser = async (req: Request, res: Response) => {
    const data = req.body;
    await userModel.createUser(data);
    res.send(data);
}

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    await userModel.deleteUser(parseInt(id));
    res.send(id);
}

export {
    getUser,
    getUsers,
    createUser,
    deleteUser,
}