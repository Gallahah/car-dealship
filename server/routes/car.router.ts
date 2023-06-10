import { Router } from "express";
import { createCar, deleteCar, getCars, getCar, updateCar } from "../controllers/car.controller";

export const carRouter = Router();
carRouter.get('/cars', getCars);
carRouter.get('/car/:id', getCar);
carRouter.get('/car', getCar);
carRouter.post('/car', createCar);
carRouter.put('/car/:id', updateCar);
carRouter.delete('/car/:id', deleteCar);
