import { Router } from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser, loginUser } from "../controllers/user.controller";

const userRouter = Router();
userRouter.get('/user', getUsers);
userRouter.get('/user/:id', getUser);
userRouter.post('/user', createUser);
userRouter.post('/user/login', loginUser);
userRouter.put('/user/:id', updateUser);
userRouter.delete('/user/:id', deleteUser);

export { userRouter };