import { Router } from "express";
import {createUser, deleteUser, getProfile, getUser, getUsers, loginUser} from "../controllers/user.controller";

const userRouter = Router();
userRouter.get('/user', getUsers);
userRouter.get('/user/:id', getUser);
userRouter.post('/user', createUser);
userRouter.post('/user/login', loginUser);
userRouter.delete('/user/:id', deleteUser);
userRouter.get('/user/:id/profile', getProfile);

export { userRouter };