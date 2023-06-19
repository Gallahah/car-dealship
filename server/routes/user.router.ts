import { Router } from "express";
import { createUser, deleteUser, getUser, getUsers } from "../controllers/user.controller";

export const userRouter = Router();
userRouter.get('/users', getUsers);
userRouter.get('/user/:id', getUser);
userRouter.post('/user', createUser);
userRouter.delete('/user/:id', deleteUser);
